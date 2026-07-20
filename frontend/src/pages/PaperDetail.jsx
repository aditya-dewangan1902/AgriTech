import { useParams } from 'react-router-dom';
import { Calendar, Scan, Tag, Download, Eye, Book } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../api';
import { DUMMY_PAPERS } from '../dummyData';

const PaperDetail = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await api.get(`/public/papers/${id}`);
        setPaper(res.data);
      } catch (err) {
        console.error(err);
        const dummyMatch = DUMMY_PAPERS.find(p => p.id === id);
        if (dummyMatch) {
          setPaper(dummyMatch);
        }
      }
    };
    fetchPaper();
  }, [id]);

  if (!paper) return <div className="text-center py-20">Loading...</div>;

  return (
    <>
      <section className="py-12 md:py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <h1 className="merriweather text-3xl md:text-4xl font-extrabold leading-tight text-gray-900 mb-4">
            {paper.Submission?.title}
          </h1>

          <div className="text-lg text-primary font-medium mb-4 flex flex-wrap gap-x-6 gap-y-2">
            <span className="flex items-center text-sm text-gray-600"><Calendar className="w-4 h-4 mr-2 text-primary" /> Published: {new Date(paper.publicationDate).toISOString().split('T')[0]}</span>
            <span className="flex items-center text-sm text-gray-600"><Scan className="w-4 h-4 mr-2 text-primary" /> DOI: {paper.doi}</span>
            <span className="flex items-center text-sm text-gray-600"><Tag className="w-4 h-4 mr-2 text-primary" /> {paper.Submission?.keywords}</span>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-2">Authors:</h2>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-base text-gray-600">
              <li>
                <strong>{paper.Submission?.author?.firstName} {paper.Submission?.author?.lastName}</strong> (Corresponding Author) - <i>{paper.Submission?.author?.affiliation}</i>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <article className="lg:col-span-3 text-gray-900">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 merriweather">Abstract</h2>
                <p className="mb-4 text-gray-700 leading-relaxed">{paper.Submission?.abstract}</p>
              </section>

              <section className="mt-8">
                <h3 className="text-lg font-semibold merriweather mb-3 text-gray-900">Keywords:</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  {paper.Submission?.keywords.split(',').map((keyword, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-300">
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </section>



              <section className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 merriweather border-b-2 border-primary pb-2">Full Paper Viewer</h2>
                <div className="mt-4 bg-gray-50 border border-gray-300 rounded-lg shadow-inner overflow-hidden">
                  <iframe src={paper.pdfUrl} className="w-full h-[600px] md:h-[800px] lg:h-[1000px] rounded-md" frameBorder="0" title="Full Paper PDF Viewer">
                    <p className="p-4 text-center text-gray-600">
                      Your browser does not support embedded PDFs.
                      <a href={paper.pdfUrl} className="text-primary font-medium underline hover:text-primary-dark ml-1">Download the PDF</a> instead.
                    </p>
                  </iframe>
                </div>
              </section>
            </article>

            <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-32 h-fit">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold merriweather mb-4 text-primary">Article Actions</h3>
                <a href={paper.pdfUrl || '#'} download className="w-full flex items-center justify-center bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors mb-4">
                  <Download className="w-5 h-5 mr-3" /> Download Full PDF
                </a>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold merriweather mb-4 text-gray-900">Metrics</h3>
                <ul className="space-y-3 text-base text-gray-900">
                  <li className="flex justify-between items-center">
                    <span className="flex items-center text-sm text-gray-600"><Eye className="w-4 h-4 mr-2 text-primary" /> Total Views:</span>
                    <span className="font-semibold">{paper.views || 0}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="flex items-center text-sm text-gray-600"><Download className="w-4 h-4 mr-2 text-primary" /> PDF Downloads:</span>
                    <span className="font-semibold">{paper.downloads || 0}</span>
                  </li>
                  <li className="flex justify-between items-center border-t pt-3 mt-3 border-gray-200">
                    <span className="flex items-center text-sm text-gray-600"><Book className="w-4 h-4 mr-2 text-primary" /> Issue:</span>
                    <span className="font-semibold">{paper.issue}</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaperDetail;
