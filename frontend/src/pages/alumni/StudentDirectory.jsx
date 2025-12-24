import { useState, useEffect } from 'react';
import { LuUsers, LuSearch, LuEye, LuMail, LuMessageSquare } from 'react-icons/lu';
import { Card, Badge, Spinner, EmptyState, Avatar } from '@/components/common';
import { userAPI } from '@/services/api';
import toast from 'react-hot-toast';

const StudentDirectory = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    branch: '',
    batch: ''
  });
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [filters]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getStudents(filters);
      setStudents(response.data.data.students);
    } catch (error) {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleRequestMentorship = (studentId) => {
    // This would integrate with the mentorship system
    toast.success('Mentorship request sent! (Feature coming soon)');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Directory</h1>
        <p className="text-gray-600 mt-2">Connect with students from your alma mater</p>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or skills..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={filters.branch}
            onChange={(e) => handleFilterChange('branch', e.target.value)}
            className="input-field"
          >
            <option value="">All Branches</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics & Communication">Electronics & Communication</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={filters.batch}
            onChange={(e) => handleFilterChange('batch', e.target.value)}
            className="input-field"
          >
            <option value="">All Batches</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <LuUsers className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <LuUsers className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">High Achievers (CGPA ≥ 8)</p>
              <p className="text-2xl font-bold text-gray-900">
                {students.filter(s => s.studentDetails?.cgpa >= 8).length}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <LuUsers className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Final Year</p>
              <p className="text-2xl font-bold text-gray-900">
                {students.filter(s => s.studentDetails?.batch === '2025').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Students Grid */}
      {students.length === 0 ? (
        <EmptyState
          icon={LuUsers}
          title="No students found"
          description="Try adjusting your filters"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <Card key={student._id}>
              <div className="flex flex-col items-center text-center">
                <Avatar name={student.name} src={student.avatar} size="xl" />
                <h3 className="text-lg font-semibold text-gray-900 mt-4">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.email}</p>
                
                <div className="flex gap-2 mt-3">
                  <Badge variant="info">{student.studentDetails?.branch}</Badge>
                  <Badge variant="secondary">Batch {student.studentDetails?.batch}</Badge>
                </div>

                <div className="w-full mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">CGPA</span>
                    <span className="font-semibold">{student.studentDetails?.cgpa}/10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Year</span>
                    <span className="font-semibold">{student.studentDetails?.currentYear || 'N/A'}</span>
                  </div>
                </div>

                {student.studentDetails?.skills && student.studentDetails.skills.length > 0 && (
                  <div className="w-full mt-4">
                    <p className="text-sm text-gray-600 mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {student.studentDetails.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="badge badge-secondary text-xs">{skill}</span>
                      ))}
                      {student.studentDetails.skills.length > 3 && (
                        <span className="badge badge-secondary text-xs">+{student.studentDetails.skills.length - 3}</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="w-full mt-4 flex gap-2">
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm"
                  >
                    <LuEye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => window.location.href = `mailto:${student.email}`}
                    className="flex-1 btn-secondary flex items-center justify-center gap-2 text-sm"
                  >
                    <LuMail className="w-4 h-4" />
                    Contact
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Student Profile</h2>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b">
                  <Avatar name={selectedStudent.name} src={selectedStudent.avatar} size="xl" />
                  <div>
                    <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                    <p className="text-gray-600">{selectedStudent.email}</p>
                    <p className="text-sm text-gray-500">{selectedStudent.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Branch</p>
                    <p className="font-semibold">{selectedStudent.studentDetails?.branch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Batch</p>
                    <p className="font-semibold">{selectedStudent.studentDetails?.batch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">CGPA</p>
                    <p className="font-semibold">{selectedStudent.studentDetails?.cgpa}/10</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Enrollment</p>
                    <p className="font-semibold">{selectedStudent.studentDetails?.enrollmentNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Year</p>
                    <p className="font-semibold">{selectedStudent.studentDetails?.currentYear || 'N/A'}</p>
                  </div>
                </div>

                {selectedStudent.studentDetails?.skills && selectedStudent.studentDetails.skills.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.studentDetails.skills.map((skill, idx) => (
                        <span key={idx} className="badge badge-info">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedStudent.studentDetails?.resume && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Resume</p>
                    <a
                      href={selectedStudent.studentDetails.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <LuEye className="w-4 h-4" />
                      View Resume
                    </a>
                  </div>
                )}

                <div className="pt-6 border-t flex gap-3">
                  <a
                    href={`mailto:${selectedStudent.email}`}
                    className="btn-primary flex items-center gap-2"
                  >
                    <LuMail className="w-4 h-4" />
                    Send Email
                  </a>
                  <button
                    onClick={() => handleRequestMentorship(selectedStudent._id)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <LuMessageSquare className="w-4 h-4" />
                    Offer Mentorship
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

export default StudentDirectory;
