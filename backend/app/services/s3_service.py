import boto3
from botocore.exceptions import NoCredentialsError
from fastapi import UploadFile
from app.core.config import settings
import uuid
import os

def get_s3_client():
    # If testing locally without AWS, we might mock this or save to disk.
    # For now, we will fallback to local storage if credentials are "test"
    if settings.AWS_ACCESS_KEY_ID == "test":
        return None
        
    return boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_REGION
    )

async def upload_resume_to_s3(file: UploadFile, user_id: int) -> str:
    s3_client = get_s3_client()
    file_extension = file.filename.split('.')[-1]
    unique_filename = f"{user_id}/{uuid.uuid4()}.{file_extension}"
    
    if not s3_client:
        # Save locally for development when AWS isn't configured
        local_path = f"uploads/{unique_filename}"
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        content = await file.read()
        with open(local_path, "wb") as f:
            f.write(content)
        await file.seek(0)
        return local_path
        
    try:
        s3_client.upload_fileobj(
            file.file,
            settings.AWS_S3_BUCKET,
            unique_filename,
            ExtraArgs={"ContentType": file.content_type}
        )
        return f"https://{settings.AWS_S3_BUCKET}.s3.{settings.AWS_REGION}.amazonaws.com/{unique_filename}"
    except Exception as e:
        print(f"Error uploading to S3: {e}")
        raise
