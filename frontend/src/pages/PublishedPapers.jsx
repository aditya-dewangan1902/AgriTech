import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Download, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../api';
import { DUMMY_PAPERS } from '../dummyData';

const PublishedPapers = () => {
  const [papers, setPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await api.get('/public/papers');
        if (res.data && res.data.length > 0) {
          setPapers(res.data);
        } else {
          setPapers(DUMMY_PAPERS);
        }
      } catch (err) {
        console.error(err);
        setPapers(DUMMY_PAPERS);
      }
    };
    fetchPapers();
  }, []);

  const filteredPapers = papers.filter(paper => 
    paper.Submission?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    paper.Submission?.keywords?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Page Header Section */}
      <section className="py-12 md:py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="text-center">
            <h1 className="merriweather text-4xl font-bold text-text-primary mb-3">Published Research Articles</h1>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">Browse the full archive of peer-reviewed
              content in Advanced Computing and AI in Agriculture.</p>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Filter Sidebar (Left) + Paper List (Right) */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Filter Sidebar (LHS - 1/4 width on desktop) */}
            <aside className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-[#E5E5E5] h-fit lg:sticky lg:top-32">
              <h2 className="text-xl font-semibold merriweather mb-6 border-b pb-3 text-primary">Filter Articles</h2>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Search by Keyword */}
                <div>
                  <label htmlFor="search-keyword" className="block text-sm font-medium text-text-primary mb-2">Search Keywords</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input 
                      type="text" 
                      id="search-keyword" 
                      placeholder="e.g., Robotics, Deep Learning"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-style w-full pl-10 pr-4 py-2 focus:ring-primary focus:border-primary" 
                    />
                  </div>
                </div>

                {/* Filter by Category */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Specialized Field</label>
                  <div className="space-y-2 text-sm text-text-primary">
                    {['AI/ML', 'Computer Vision', 'IoT & Smart Farming', 'Blockchain', 'Big Data Analytics', 'Robotics', 'Climate-Smart Agriculture'].map(cat => (
                      <label key={cat} className="flex items-center space-x-2">
                        <input type="checkbox" name="category" value={cat} className="text-primary rounded focus:ring-primary" />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter by Publication Date */}
                <div>
                  <label htmlFor="sort-by" className="block text-sm font-medium text-text-primary mb-2">Sort By</label>
                  <select id="sort-by" className="input-style w-full py-2 px-3 focus:ring-primary focus:border-primary">
                    <option>Newest First</option>
                    <option>Most Downloaded</option>
                    <option>Most Viewed</option>
                    <option>Alphabetical (Title)</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors">Apply Filters</button>
                  <button type="reset" onClick={() => setSearchTerm('')} className="w-full text-primary border border-primary py-2.5 rounded-lg font-medium hover:bg-green-50 transition-colors">Clear Filters</button>
                </div>
              </form>
            </aside>

            {/* Paper List (RHS - 3/4 width on desktop) */}
            <section className="lg:col-span-3 space-y-4">
              {/* Pagination/Results Info (Top) */}
              <div className="flex justify-between items-center text-sm text-text-secondary pb-4 border-b border-[#E5E5E5]">
                <span>Showing {filteredPapers.length > 0 ? 1 : 0} – {filteredPapers.length} of {papers.length} results</span>
              </div>

              {/* Article Loop */}
              <div className="space-y-4">
                {filteredPapers.map(paper => (
                  <div key={paper.id} className="paper-row-transition bg-white p-5 rounded-xl border border-[#E5E5E5] shadow-sm group">
                    <div className="flex justify-between items-start">
                      <Link to={`/papers/${paper.id}`} className="text-xl font-semibold text-primary hover:underline merriweather flex-grow pr-4 paper-title">
                        {paper.Submission?.title}
                      </Link>
                      <div className="flex-shrink-0 flex space-x-3 text-text-secondary">
                        <FileText className="w-5 h-5 hover:text-primary paper-icon cursor-pointer" title="View Abstract" />
                        <a href={paper.pdfUrl || '#'} download>
                          <Download className="w-5 h-5 hover:text-primary paper-icon cursor-pointer" title="Download PDF" />
                        </a>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary mt-1 paper-meta">
                      <strong>Authors:</strong> {paper.Submission?.author?.firstName} {paper.Submission?.author?.lastName} | <strong>Published:</strong> {new Date(paper.publicationDate).toISOString().split('T')[0]}
                    </p>
                    <p className="text-sm text-text-secondary mt-1 paper-meta">
                      <strong>Category:</strong> {paper.Submission?.keywords}
                    </p>
                    <p className="text-base text-text-primary mt-3 line-clamp-3 paper-abstract">
                      <strong>Abstract:</strong> {paper.Submission?.abstract}
                    </p>
                    <div className="mt-4 text-sm flex space-x-4 text-text-secondary paper-meta">
                      <span className="flex items-center space-x-1" title="Views">
                        <Eye className="w-4 h-4" /> <span>{paper.views || '1,200'}</span>
                      </span>
                      <span className="flex items-center space-x-1" title="Downloads">
                        <Download className="w-4 h-4" /> <span>{paper.downloads || '450'}</span>
                      </span>
                    </div>
                  </div>
                ))}
                
                {filteredPapers.length === 0 && (
                  <div className="text-center py-10 text-text-secondary">
                    No papers found matching your criteria.
                  </div>
                )}
              </div>

              {/* Pagination (Bottom) */}
              {filteredPapers.length > 0 && (
                <nav className="flex justify-center items-center space-x-1 text-sm pt-8">
                  <button className="p-2 border border-[#E5E5E5] rounded-lg text-text-secondary hover:bg-green-50 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                  <button className="py-2 px-4 bg-primary text-white font-medium rounded-lg">1</button>
                  <button className="py-2 px-4 border border-[#E5E5E5] rounded-lg text-text-secondary hover:bg-green-50 transition-colors">2</button>
                  <button className="py-2 px-4 border border-[#E5E5E5] rounded-lg text-text-secondary hover:bg-green-50 transition-colors">3</button>
                  <span className="py-2 px-4 text-text-secondary">...</span>
                  <button className="p-2 border border-[#E5E5E5] rounded-lg text-text-secondary hover:bg-green-50 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                </nav>
              )}
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default PublishedPapers;
