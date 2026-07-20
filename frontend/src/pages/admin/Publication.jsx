import { useState } from 'react';
import { PencilRuler, Search, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPublication = () => {
  return (
    <>
      <header className="mb-10 lg:pt-8">
        <h1 className="merriweather text-3xl font-bold text-[#222222] mb-1 flex items-center">
          <PencilRuler className="w-7 h-7 mr-3 text-primary" /> Publication Tools
        </h1>
        <p className="text-lg text-[#555555]">Manage formatting and final publication of accepted papers.</p>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="relative sm:w-72">
          <input type="text" placeholder="Search accepted papers..." className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark/50 text-sm" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-[#E5E5E5] overflow-x-auto mt-6">
        <table className="min-w-full divide-y divide-[#E5E5E5]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#555555] uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E5] text-[#444444]">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">1007</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                Machine Learning for Optimized Livestock Feeding
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">E. Clark</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Ready to Publish</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-primary hover:text-primary-dark font-semibold flex items-center">
                  <UploadCloud className="w-4 h-4 mr-1" /> Publish to Live
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminPublication;
