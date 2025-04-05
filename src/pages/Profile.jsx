import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import ResumeUpload from "@/components/custom/Profile/Resume";
import ProfileTab from "@/components/custom/Profile/ProfileTab";
import ExperienceTab from "@/components/custom/Profile/ExperienceTab";
import EducationTab from "@/components/custom/Profile/EducationTab";
import SkillsTab from "@/components/custom/Profile/SkillTab";
import PreferencesTab from "@/components/custom/Profile/PreferencesTab";
import EditModal from "@/components/custom/Profile/EditModel";
import LeftSidebar from "@/components/custom/Profile/LeftSidebar";
import useAxios from "@/hooks/useAxios";
import PersonalInfoForm from "@/components/custom/Profile/forms/PersonalInfoForm";
import ContactInfoForm from "@/components/custom/Profile/forms/ContactInfoForm";
import PhotoUploadForm from "@/components/custom/Profile/forms/PhotoUploadForm";
import SkillsForm from "@/components/custom/Profile/forms/SkillsForm";
import PreferencesForm from "@/components/custom/Profile/forms/PreferencesForm";
import ExperienceForm from "@/components/custom/Profile/forms/ExperienceForm";
import EducationForm from "@/components/custom/Profile/forms/EducationForm";
import CertificationForm from "@/components/custom/Profile/forms/CertificationForm";
import JobTypeForm from "@/components/custom/Profile/forms/JobTypeForm";
import SalaryForm from "@/components/custom/Profile/forms/SalaryForm";
import LocationsForm from "@/components/custom/Profile/forms/LocationsForm";

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const tabContentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
  hover: {
    scale: 1.02,
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

const floatingButtonVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: { delay: 0.5, type: "spring", stiffness: 260, damping: 20 },
  },
  hover: {
    scale: 1.1,
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  tap: { scale: 0.9 },
};

const modalVariants = {
  initial: { opacity: 0, scale: 0.8, y: 50 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
  exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } },
};

const JobSeekerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progressTracker, setProgressTracker] = useState(0);
  const axios = useAxios();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/job-seeker/me`);
        console.log(response);

        if (response) {
          setProfile(response.data.jobSeeker);
          setProgressTracker(response.data.profileStatus.overallCompletionPercentage);
        } else {
          setError("Unable to fetch profile data");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [axios]);

  const [activeTab, setActiveTab] = useState("profile");
  const [editModal, setEditModal] = useState({
    isOpen: false,
    type: null,
    index: null,
  });

  const handleEdit = (type, index = null) => {
    setEditModal({
      isOpen: true,
      type,
      index,
    });
  };

  const handleAdd = (type) => {
    setEditModal({
      isOpen: true,
      type: `add_${type}`,
      index: null,
    });
  };

  const closeModal = () => {
    setEditModal({
      isOpen: false,
      type: null,
      index: null,
    });
  };

  const getModalTitle = (type, index = null) => {
    switch (type) {
      case "profile":
        return "Edit Profile";
      case "contact":
        return "Edit Contact Information";
      case "photo":
        return "Upload Photo";
      case "skills":
        return "Edit Skills";
      case "preferences":
        return "Edit Preferences";
      case "experience":
        const company = profile?.work_experience?.[index]?.company;
        return `Edit Experience at ${company || "Company"}`;
      case "add_experience":
        return "Add New Experience";
      case "education":
        const institution = profile?.education?.[index]?.institution;
        return `Edit Education at ${institution || "Institution"}`;
      case "add_education":
        return "Add New Education";
      case "certification":
        const certName = profile?.certifications?.[index]?.name;
        return `Edit Certification: ${certName || "Certificate"}`;
      case "add_certification":
        return "Add New Certification";
      case "jobType":
        return "Edit Job Type & Availability";
      case "salary":
        return "Edit Salary Expectations";
      case "locations":
        return "Edit Preferred Locations";
      default:
        return "Edit Form";
    }
  };

  const renderModalContent = () => {
    const { type, index } = editModal;

    switch (type) {
      case "profile":
        return (
          <PersonalInfoForm
            initialData={profile}
            onSubmit={handleFormSubmit}
            loading={loading}
            onClose={closeModal}
          />
        );
      case "contact":
        return (
          <ContactInfoForm
            initialData={profile}
            onSubmit={handleFormSubmit}
            loading={loading}
            onClose={closeModal}
          />
        );
      case "photo":
        return (
          <PhotoUploadForm
            initialData={profile}
            onSubmit={handleFormSubmit}
            loading={loading}
            onClose={closeModal}
          />
        );
      case "skills":
        return (
          <SkillsForm
            initialData={profile}
            onSubmit={handleFormSubmit}
            loading={loading}
            onClose={closeModal}
          />
        );
      case "preferences":
        return (
          <PreferencesForm
            initialData={profile}
            onSubmit={handleFormSubmit}
            loading={loading}
            onClose={closeModal}
          />
        );
      case "resume":
        return (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-600">
              Upload your resume to showcase your skills and experience to
              potential employers.
            </p>

            <ResumeUpload
              initialResume={
                profile.resume
                  ? {
                      name: "resume.pdf",
                      size: 500000,
                      type: "application/pdf",
                      url: profile.resume,
                    }
                  : null
              }
              onUploadSuccess={(resumeData) => {
                setProfile((prev) => ({
                  ...prev,
                  resume: resumeData ? resumeData.url : null,
                }));

                setTimeout(() => {
                  closeModal();
                }, 1000);
              }}
            />

            <div className="flex justify-end mt-4">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md mr-2 hover:bg-gray-50"
              >
                Cancel
              </motion.button>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={closeModal}
                className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
              >
                Done
              </motion.button>
            </div>
          </motion.div>
        );
      case "experience":
        const experienceData = profile?.work_experience?.[index];
        return (
          <ExperienceForm
            initialData={experienceData}
            onSubmit={handleFormSubmit}
            loading={loading}
            onClose={closeModal}
            editModal={editModal}
          />
        );
      case "add_experience":
        return (
          <ExperienceForm
            initialData={null}
            onSubmit={handleFormSubmit}
            loading={loading}
            onClose={closeModal}
            editModal={editModal}
          />
        );
      case "education":
        const educationData = profile?.education?.[index];
        return (
          <EducationForm
            initialData={educationData}
            onSubmit={handleFormSubmit}
            loading={loading}
            onClose={closeModal}
            editModal={editModal}
          />
        );
      case "add_education":
        return (
          <EducationForm
            initialData={null}
            onSubmit={handleFormSubmit}
            loading={loading}
            onClose={closeModal}
            editModal={editModal}
          />
        );
      case "certification":
        const certificationData = profile?.certifications?.[index];
        return (
          <CertificationForm
            initialData={certificationData}
            onSubmit={handleFormSubmit}
            loading={loading}
            onClose={closeModal}
            editModal={editModal}
          />
        );
      case "add_certification":
        return (
          <CertificationForm
            initialData={null}
            onSubmit={handleFormSubmit}
            loading={loading}
            onClose={closeModal}
            editModal={editModal}
          />
        );
      case "jobType":
        return (
          <JobTypeForm
            initialData={profile}
            onSubmit={handleFormSubmit}
            loading={loading}
            onClose={closeModal}
            editModal={editModal}
          />
        );
      case "salary":
        return (
          <SalaryForm
            initialData={profile}
            onSubmit={handleFormSubmit}
            loading={loading}
            onClose={closeModal}
            editModal={editModal}
          />
        );
      case "locations":
        return (
          <LocationsForm
            initialData={profile}
            onSubmit={handleFormSubmit}
            loading={loading}
            onClose={closeModal}
            editModal={editModal}
          />
        );
      default:
        return <h4>Edit Form</h4>;
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      let endpoint = "/job-seeker/update";
      let requestData = formData;

      // Special handling for different update types
      if (formData.type === "experience") {
        endpoint = `/job-seeker/experience/${
          formData.index || editModal.index
        }`;
        requestData = formData.data;
      } else if (formData.type === "add_experience") {
        endpoint = "/job-seeker/experience";
        requestData = formData.data;
      } else if (formData.type === "education") {
        endpoint = `/job-seeker/education/${formData.index || editModal.index}`;
        requestData = formData.data;
      } else if (formData.type === "add_education") {
        endpoint = "/job-seeker/education";
        requestData = formData.data;
      } else if (formData.type === "certification") {
        endpoint = `/job-seeker/certification/${
          formData.index || editModal.index
        }`;
        requestData = formData.data;
      } else if (formData.type === "add_certification") {
        endpoint = "/job-seeker/certification";
        requestData = formData.data;
      } else {
        endpoint = "/job-seeker/update";
        requestData = formData;
      }

      console.log("Submitting to endpoint:", endpoint);
      console.log("Request data:", requestData);

      const response = await axios.patch(endpoint, requestData);

      if (response.data) {
        // Update the profile state based on the type of update
        if (formData.type === "experience") {
          const updateIndex = formData.index || editModal.index;
          setProfile((prev) => ({
            ...prev,
            work_experience: prev.work_experience.map((exp, idx) =>
              idx === updateIndex
                ? response.data.experience || response.data
                : exp
            ),
          }));
        } else if (formData.type === "add_experience") {
          setProfile((prev) => ({
            ...prev,
            work_experience: [
              ...(prev.work_experience || []),
              response.data.experience || response.data,
            ],
          }));
        } else if (formData.type === "education") {
          const updateIndex = formData.index || editModal.index;
          setProfile((prev) => ({
            ...prev,
            education: prev.education.map((edu, idx) =>
              idx === updateIndex
                ? response.data.education || response.data
                : edu
            ),
          }));
        } else if (formData.type === "add_education") {
          setProfile((prev) => ({
            ...prev,
            education: [
              ...(prev.education || []),
              response.data.education || response.data,
            ],
          }));
        } else if (formData.type === "certification") {
          const updateIndex = formData.index || editModal.index;
          setProfile((prev) => ({
            ...prev,
            certifications: prev.certifications.map((cert, idx) =>
              idx === updateIndex
                ? response.data.certification || response.data
                : cert
            ),
          }));
        } else if (formData.type === "add_certification") {
          setProfile((prev) => ({
            ...prev,
            certifications: [
              ...(prev.certifications || []),
              response.data.certification || response.data,
            ],
          }));
        } else {
          setProfile((prev) => ({
            ...prev,
            ...response.data,
          }));
        }
        closeModal();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab profile={profile} onEdit={handleEdit} />;
      case "experience":
        return (
          <ExperienceTab
            experiences={profile.work_experience}
            onEdit={handleEdit}
            onAdd={handleAdd}
          />
        );
      case "education":
        return (
          <EducationTab
            education={profile.education}
            onEdit={handleEdit}
            onAdd={handleAdd}
          />
        );
      case "skills":
        return (
          <SkillsTab
            skills={profile.skills}
            certifications={profile.certifications}
            onEdit={handleEdit}
            onAdd={handleAdd}
          />
        );
      case "preferences":
        return <PreferencesTab preferences={profile} onEdit={handleEdit} />;
      default:
        return <ProfileTab profile={profile} onEdit={handleEdit} />;
    }
  };

  // Animation for tab indicators
  const tabUnderlineVariants = {
    profile: { x: 0 },
    experience: { x: 100 },
    education: { x: 200 },
    skills: { x: 300 },
    preferences: { x: 400 },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sky-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-t-4 border-sky-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sky-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-md max-w-md text-center"
        >
          <div className="text-red-500 text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sky-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-md max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Plus className="h-10 w-10 text-sky-500" />
          </motion.div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Create Your Profile
          </h2>
          <p className="text-gray-600 mb-6">
            Your profile helps employers discover you. Complete your details to
            stand out in the job market.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEdit("profile")}
            className="px-5 py-3 bg-sky-500 text-white rounded-md hover:bg-sky-600 shadow-sm"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col lg:flex-row min-h-screen bg-sky-50"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Left Sidebar - Full width on mobile/tablet, 1/3 width on desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full lg:w-1/3 lg:h-screen"
      >
        <LeftSidebar profile={profile} progressTracker={progressTracker} />
      </motion.div>

      {/* Right Side (Tabs and Content) - Full width on mobile/tablet, 2/3 width on desktop */}
      <motion.div
        className="w-full lg:w-2/3 p-4 md:p-5 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Tabs navigation - Scrollable on mobile */}
        <motion.div
          className="bg-white rounded-md shadow-sm mb-5 border border-gray-200 overflow-x-auto"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <div className="flex border-b relative min-w-max">
            <motion.button
              className={`px-4 sm:px-6 py-3 font-medium text-sm relative ${
                activeTab === "profile"
                  ? "text-sky-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("profile")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Profile
            </motion.button>
            <motion.button
              className={`px-4 sm:px-6 py-3 font-medium text-sm relative ${
                activeTab === "experience"
                  ? "text-sky-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("experience")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Experience
            </motion.button>
            <motion.button
              className={`px-4 sm:px-6 py-3 font-medium text-sm relative ${
                activeTab === "education"
                  ? "text-sky-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("education")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Education
            </motion.button>
            <motion.button
              className={`px-4 sm:px-6 py-3 font-medium text-sm relative ${
                activeTab === "skills"
                  ? "text-sky-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("skills")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skills
            </motion.button>
            <motion.button
              className={`px-4 sm:px-6 py-3 font-medium text-sm relative ${
                activeTab === "preferences"
                  ? "text-sky-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("preferences")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Preferences
            </motion.button>

            {/* Animated underline indicator - adjusted for mobile */}
            <motion.div
              className="absolute bottom-0 h-0.5 w-16 bg-sky-500"
              animate={activeTab}
              variants={{
                profile: { x: window.innerWidth < 640 ? 16 : 32 },
                experience: { x: window.innerWidth < 640 ? 84 : 132 },
                education: { x: window.innerWidth < 640 ? 170 : 220 },
                skills: { x: window.innerWidth < 640 ? 236 : 304 },
                preferences: { x: window.innerWidth < 640 ? 300 : 388 },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </motion.div>

        {/* Tab content with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-transparent"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>

        {/* Edit Modal with AnimatePresence for proper enter/exit animations */}
        <AnimatePresence>
          {editModal.isOpen && (
            <EditModal
              isOpen={editModal.isOpen}
              onClose={closeModal}
              title={getModalTitle(editModal.type, editModal.index)}
              type={editModal.type}
              data={
                editModal.type === "experience"
                  ? {
                      ...profile?.work_experience?.[editModal.index],
                      index: editModal.index,
                    }
                  : editModal.type === "education"
                  ? {
                      ...profile?.education?.[editModal.index],
                      index: editModal.index,
                    }
                  : editModal.type === "certification"
                  ? {
                      ...profile?.certifications?.[editModal.index],
                      index: editModal.index,
                    }
                  : profile
              }
              onUpdate={(updatedData) => {
                if (editModal.type === "experience") {
                  // Update specific experience in the array
                  setProfile((prev) => ({
                    ...prev,
                    work_experience: prev.work_experience.map((exp, idx) =>
                      idx === editModal.index ? updatedData : exp
                    ),
                  }));
                } else if (editModal.type === "add_experience") {
                  // Add new experience to the array
                  setProfile((prev) => ({
                    ...prev,
                    work_experience: [
                      ...(prev.work_experience || []),
                      updatedData,
                    ],
                  }));
                } else if (editModal.type === "education") {
                  // Update specific education in the array
                  setProfile((prev) => ({
                    ...prev,
                    education: prev.education.map((edu, idx) =>
                      idx === editModal.index ? updatedData : edu
                    ),
                  }));
                } else if (editModal.type === "add_education") {
                  // Add new education to the array
                  setProfile((prev) => ({
                    ...prev,
                    education: [...(prev.education || []), updatedData],
                  }));
                } else if (editModal.type === "certification") {
                  // Update specific certification in the array
                  setProfile((prev) => ({
                    ...prev,
                    certifications: prev.certifications.map((cert, idx) =>
                      idx === editModal.index ? updatedData : cert
                    ),
                  }));
                } else if (editModal.type === "add_certification") {
                  // Add new certification to the array
                  setProfile((prev) => ({
                    ...prev,
                    certifications: [
                      ...(prev.certifications || []),
                      updatedData,
                    ],
                  }));
                } else {
                  // Handle other updates
                  setProfile((prev) => ({
                    ...prev,
                    ...updatedData,
                  }));
                }
              }}
              motionProps={{
                variants: modalVariants,
                initial: "initial",
                animate: "animate",
                exit: "exit",
              }}
            >
              {renderModalContent()}
            </EditModal>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating action button with animations */}
      <motion.div
        className="fixed bottom-6 right-6 z-10"
        variants={floatingButtonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
      >
        <Link
          to="/dashboard"
          className="bg-sky-500 hover:bg-sky-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1,
            }}
          >
            <Heart className="h-6 w-6" />
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default JobSeekerProfile;
