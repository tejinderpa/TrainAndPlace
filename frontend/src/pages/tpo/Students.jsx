import { useState, useEffect } from 'react';
import { LuUsers, LuSearch, LuFilter, LuDownload, LuEye } from 'react-icons/lu';
import { Card, Badge, Spinner, EmptyState } from '@/components/common';
import { userAPI } from '@/services/api';
import toast from 'react-hot-toast';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    branch: '',
    batch: '',
    minCgpa: ''
  });
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [filters.branch, filters.batch, filters.minCgpa]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getStudents(filters);
      setStudents(response.data.data.students || []);
    } catch (error) {
      toast.error('Failed to load students');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = Array.isArray(students) ? students.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(filters.search.toLowerCase()) ||
    student.email.toLowerCase().includes(filters.search.toLowerCase()) ||
    student.studentDetails?.enrollmentNumber?.toLowerCase().includes(filters.search.toLowerCase())
  ) : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-2">View and manage student profiles</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <LuDownload className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <p className="text-2xl font-bold text-gray-900">{students.length}</p>
          <p className="text-sm text-gray-600">Total Students</p>
        </Card>
        <Card>
          <p className="text-2xl font-bold text-green-600">
            {students.filter(s => s.studentDetails?.cgpa >= 8).length}
          </p>
          <p className="text-sm text-gray-600">CGPA ≥ 8.0</p>
        </Card>
        <Card>
          <p className="text-2xl font-bold text-blue-600">
            {students.filter(s => s.studentDetails?.yearOfStudy === 4).length}
          </p>
          <p className="text-sm text-gray-600">Final Year</p>
        </Card>
        <Card>
          <p className="text-2xl font-bold text-purple-600">
            {students.filter(s => s.isActive).length}
          </p>
          <p className="text-sm text-gray-600">Active</p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <select
            value={filters.branch}
            onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Branches</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics & Communication">Electronics & Communication</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>

          <select
            value={filters.batch}
            onChange={(e) => setFilters({ ...filters, batch: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Batches</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>

          <select
            value={filters.minCgpa}
            onChange={(e) => setFilters({ ...filters, minCgpa: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Any CGPA</option>
            <option value="9">CGPA ≥ 9.0</option>
            <option value="8">CGPA ≥ 8.0</option>
            <option value="7">CGPA ≥ 7.0</option>
            <option value="6">CGPA ≥ 6.0</option>
          </select>
        </div>
      </Card>

      {/* Students Table */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          icon={LuUsers}
          title="No students found"
          description="No students match your search criteria. Try adjusting your filters."
        />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Enrollment</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Branch</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Year</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">CGPA</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{student.firstName} {student.lastName}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">
                      {student.studentDetails?.enrollmentNumber || 'N/A'}
                    </td>
                    <td className="py-4 px-4 text-gray-900">
                      {student.studentDetails?.branch || 'N/A'}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="info">
                        Year {student.studentDetails?.yearOfStudy || 'N/A'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${student.studentDetails?.cgpa >= 8 ? 'text-green-600' : 'text-gray-900'}`}>
                        {student.studentDetails?.cgpa || 'N/A'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={student.isActive ? 'success' : 'gray'}>
                        {student.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                      >
                        <LuEye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedStudent.firstName} {selectedStudent.lastName}
                  </h2>
                  <p className="text-gray-600">{selectedStudent.email}</p>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Enrollment Number</p>
                    <p className="text-gray-900">{selectedStudent.studentDetails?.enrollmentNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Branch</p>
                    <p className="text-gray-900">{selectedStudent.studentDetails?.branch || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Year of Study</p>
                    <p className="text-gray-900">{selectedStudent.studentDetails?.yearOfStudy || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">CGPA</p>
                    <p className="text-gray-900">{selectedStudent.studentDetails?.cgpa || 'N/A'}</p>
                  </div>
                </div>

                {selectedStudent.studentDetails?.skills && selectedStudent.studentDetails.skills.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.studentDetails.skills.map((skill, index) => (
                        <Badge key={index} variant="info">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button onClick={() => setSelectedStudent(null)} className="btn-secondary">
                    Close
                  </button>
                  <button className="btn-primary">
                    Download Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
