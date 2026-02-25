import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          AI Resume Analyzer
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Upload your resume and get an instant ATS score, discover skill gaps, and receive actionable insights to land your dream job faster.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 font-semibold text-lg transition-all shadow-lg hover:shadow-blue-500/30"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 rounded-full bg-transparent border-2 border-gray-500 hover:border-gray-300 font-semibold text-lg transition-all"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-colors">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h3 className="text-xl font-bold mb-2">ATS Scoring</h3>
          <p className="text-gray-400">Find out exactly how your resume is parsed by automated tracking systems.</p>
        </div>

        <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-teal-500/50 transition-colors">
          <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Actionable Insights</h3>
          <p className="text-gray-400">Get 3-5 specific recommendations on how to improve your bullet points.</p>
        </div>

        <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-colors">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Role Matching</h3>
          <p className="text-gray-400">Discover which job titles best match your current experience and skills.</p>
        </div>
      </div>
    </div>
  );
}
