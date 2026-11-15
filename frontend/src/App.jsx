import { useEffect, useState } from "react";
import axios from "axios";
import {
  Link2,
  Copy,
  Trash2,
  ExternalLink,
  MousePointerClick,
  Link,
  Sparkles,
  ArrowUpRight,
  Check,
} from "lucide-react";

const App = () => {
  const [urls, setUrls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState({});
  const [copied, setCopied] = useState("");

  const fetchUrls = async () => {
    const response = await axios.get("http://localhost:5173/api/url");
    setUrls(response.data.data);
  };

  const createShortUrl = async () => {
    const response = await axios.post("http://localhost:5173/api/url", {
      url: inputValue,
    });

    setCurrentUrl({
      originalUrl: response.data.data.originalUrl,
      shortCode: response.data.data.shortCode,
    });

    setInputValue("");

    fetchUrls();
  };

  const deleteUrl = async (id) => {
    await axios.delete(`http://localhost:5173/api/url/${id}`);
    fetchUrls();
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const copyUrl = async (shortCode) => {
    await navigator.clipboard.writeText(`http://localhost:3000/${shortCode}`);

    setCopied(shortCode);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <main className="min-h-screen bg-[#080b12] text-white px-5 py-10 md:px-10">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-14">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2.5 rounded-xl">
              <Link2 size={23} className="text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Link<span className="text-orange-400">ify.</span>
              </h1>
              <p className="text-xs text-gray-500">Smart URL Management</p>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Short links.
            <span className="text-orange-400"> Big possibilities.</span>
          </h2>

          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Transform long, complicated URLs into clean and shareable links.
            Manage everything in one place.
          </p>
        </section>

        {/* URL Input Card */}
        <section className="bg-[#111722] border border-white/10 rounded-2xl p-5 md:p-7 shadow-2xl mb-8">
          <label className="text-sm font-medium text-gray-300 mb-3 block">
            Enter your destination URL
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-3 flex-1 bg-[#080b12] border border-white/10 rounded-xl px-4 focus-within:border-orange-400/60 transition">
              <Link size={19} className="text-gray-500 shrink-0" />

              <input
                type="url"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                placeholder="https://example.com/your-long-url"
                className="w-full bg-transparent py-4 text-sm outline-none text-white placeholder:text-gray-600"
              />
            </div>

            <button
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 transition px-7 py-4 rounded-xl font-semibold text-sm cursor-pointer"
              onClick={createShortUrl}
            >
              Shorten URL
              <ArrowUpRight size={18} />
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Paste your long URL and generate a shareable short link.
          </p>
        </section>

        {/* Generated URL */}
        {currentUrl.shortCode && (
          <section className="bg-gradient-to-r from-orange-500/10 to-orange-400/5 border border-orange-400/20 rounded-2xl p-5 md:p-6 mb-10">
            <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold mb-4">
              <Sparkles size={17} />
              Your shortened URL is ready!
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <a
                  href={`http://localhost:3000/${currentUrl.shortCode}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg md:text-xl font-semibold text-white hover:text-orange-400 transition break-all"
                >
                  localhost:3000/{currentUrl.shortCode}
                  <ExternalLink size={14} className="inline ml-2" />
                </a>

                <p className="text-xs text-gray-500 mt-2 truncate">
                  {currentUrl.originalUrl}
                </p>
              </div>

              <button
                onClick={() => copyUrl(currentUrl.shortCode)}
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-xl text-sm font-medium transition cursor-pointer shrink-0"
              >
                {copied === currentUrl.shortCode ? (
                  <>
                    <Check size={16} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Copy Link
                  </>
                )}
              </button>
            </div>
          </section>
        )}

        {/* Links Dashboard */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold">Your Links</h2>
              <p className="text-xs text-gray-500 mt-1">
                Manage your shortened URLs
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm">
              <span className="text-orange-400 font-bold">{urls.length}</span>
              <span className="text-gray-400 ml-1">Links</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[1.2fr_2fr_0.7fr_1fr] gap-4 px-5 py-3 text-xs uppercase tracking-wider text-gray-500 border-b border-white/10">
            <span>Short Link</span>
            <span>Original URL</span>
            <span>Clicks</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Links List */}
          <div className="space-y-3 mt-3">
            {urls.length === 0 ? (
              <div className="border border-dashed border-white/10 rounded-2xl py-16 text-center">
                <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Link2 size={25} className="text-gray-500" />
                </div>

                <h3 className="font-semibold text-gray-300 mb-2">
                  No links yet
                </h3>

                <p className="text-sm text-gray-500">
                  Your shortened URLs will appear here.
                </p>
              </div>
            ) : (
              urls.map((url) => (
                <div
                  key={url._id}
                  className="bg-[#111722] border border-white/10 hover:border-orange-400/30 rounded-xl p-4 md:px-5 transition grid grid-cols-1 md:grid-cols-[1.2fr_2fr_0.7fr_1fr] gap-4 items-center"
                >
                  {/* Short URL */}
                  <div className="min-w-0">
                    <span className="text-xs text-gray-500 md:hidden block mb-1">
                      Short Link
                    </span>

                    <a
                      onClick={() => fetchUrls()}
                      href={`http://localhost:3000/${url.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-orange-400 font-semibold text-sm hover:text-orange-300 transition"
                    >
                      {url.shortCode}
                      <ExternalLink size={13} className="inline ml-1" />
                    </a>
                  </div>

                  {/* Original URL */}
                  <div className="min-w-0">
                    <span className="text-xs text-gray-500 md:hidden block mb-1">
                      Original URL
                    </span>

                    <p className="text-sm text-gray-400 truncate">
                      {url.originalUrl}
                    </p>
                  </div>

                  {/* Clicks */}
                  <div>
                    <span className="text-xs text-gray-500 md:hidden block mb-1">
                      Clicks
                    </span>

                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <MousePointerClick size={15} className="text-gray-500" />
                      {url.clicks}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 md:justify-end">
                    <button
                      onClick={() => copyUrl(url.shortCode)}
                      title="Copy short URL"
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-green-500/15 border border-white/10 hover:border-green-500/30 text-gray-300 hover:text-green-400 p-2.5 rounded-lg transition cursor-pointer"
                    >
                      {copied === url.shortCode ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                      <span className="text-xs md:hidden">
                        {copied === url.shortCode ? "Copied" : "Copy"}
                      </span>
                    </button>

                    <button
                      onClick={() => deleteUrl(url._id)}
                      title="Delete URL"
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-gray-300 hover:text-red-400 p-2.5 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 size={16} />
                      <span className="text-xs md:hidden">Delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-600 mt-16 pb-5">
          Built with React & Tailwind CSS
          <span className="text-orange-400"> · </span>
          Linkify URL Shortener
        </footer>
      </div>
    </main>
  );
};

export default App;
