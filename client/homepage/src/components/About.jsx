import React from "react";
import logo from "../assets/Logo.jpg";
import { motion } from "framer-motion";
import {
  Users,
  Building,
  Trophy,
  ArrowRight,
  Check,
  Brain,
  Shield,
  Bell,
  BookOpen,
  Linkedin,
  Github,
  Mail,
  Globe,
  User,
} from "lucide-react";
// // // import { Check, Users, Building, Trophy, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { number: "1M+", label: "Active Job Seekers", icon: Users },
    { number: "50K+", label: "Partner Companies", icon: Building },
    { number: "500K+", label: "Successful Placements", icon: Trophy },
  ];

  const features = [
    {
      title: "Smart Matching Technology",
      description:
        "Our AI-powered algorithm ensures the perfect match between candidates and opportunities",
    },
    {
      title: "Verified Companies",
      description:
        "All companies on our platform go through a strict verification process",
    },
    {
      title: "Real-time Updates",
      description:
        "Get instant notifications about new opportunities and application status",
    },
    {
      title: "Career Resources",
      description:
        "Access to resume builders, interview tips, and career development guides",
    },
  ];
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Full Stack Lead",
      image:"https://randomuser.me/api/portraits/women/49.jpg",
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      description: "Full stack developer with expertise in React and Node.js",
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      image:"https://randomuser.me/api/portraits/women/49.jpg",
      linkedin: "https://linkedin.com/in/sarahchen",
      github: "https://github.com/sarahchen",
      description: "Creative designer focused on user-centered experiences",
    },
    {
      name: "Michael Park",
      role: "Backend Developer",
      image:"https://randomuser.me/api/portraits/women/49.jpg",
      linkedin: "https://linkedin.com/in/michaelpark",
      github: "https://github.com/michaelpark",
      description: "Database expert specializing in scalable architectures",
    },
    {
      name: "Emma Wilson",
      role: "Frontend Developer",
      image:"https://randomuser.me/api/portraits/women/49.jpg",
      linkedin: "https://linkedin.com/in/emmawilson",
      github: "https://github.com/emmawilson",
      description: "React specialist with a passion for animations",
    },
    {
      name: "David Kumar",
      role: "DevOps Engineer",
      image:"https://randomuser.me/api/portraits/women/49.jpg",
      linkedin: "https://linkedin.com/in/davidkumar",
      github: "https://github.com/davidkumar",
      description: "Cloud infrastructure and deployment automation expert",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Dark Background */}
      <div className="relative min-h-screen overflow-hidden text-white bg-blue-900">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: `url(${logo})`,
            transition: "opacity 0.3s ease-in-out",
          }}
        ></div>

        <div className="absolute inset-0 bg-blue-950/80" />
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-8 tracking-tight">
              Connecting Talent with Opportunity
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-200 mx-auto mb-8" />
            <p className="text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12">
              CareerConnect is more than just a job portal - we're your partner
              in building meaningful careers and helping businesses find their
              perfect match.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-white text-blue-900 px-10 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mx-auto px-6 py-24">
        <div className="bg-blue-50 rounded-xl p-16 mb-24 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-blue-900 mb-8">
              Our Mission
            </h2>
            <div className="w-16 h-1 bg-blue-400 mx-auto mb-8" />
            <p className="text-xl text-blue-700 leading-relaxed">
              We believe everyone deserves a fulfilling career. Our mission is
              to revolutionize the way people find jobs and companies discover
              talent by creating a transparent, efficient, and user-friendly
              platform that puts human connection at the forefront.
            </p>
          </div>
        </div>











        <motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="py-16 bg-slate-900 text-white my-5"
>
  <div className="max-w-6xl mx-auto px-6">
    <motion.div variants={itemVariants} className="text-center mb-16">
      <h2 className="text-4xl font-bold  mb-4">
        Meet Our Team
      </h2>
      <p className="text-xl ">
        The talented individuals behind CareerConnect
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {teamMembers.map((member, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="relative max-w-sm mx-auto mt-24"
        >
          <div className="rounded-3xl overflow-hidden shadow-md border-2 border-[rgba(75,30,133,0.5)] bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white">
            <div className="absolute -mt-20 w-full flex justify-center">
              <div className="h-32 w-32">
                <img
                  src={member.image || "https://randomuser.me/api/portraits/men/1.jpg"}
                  className="rounded-full object-cover h-full w-full shadow-md"
                  alt={member.name}
                />
              </div>
            </div>
            <div className="px-6 mt-16">
              <h1 className="font-bold text-3xl text-center mb-1">
                {member.name}
              </h1>
              <p className=" text-sm text-center">
                {member.role}
              </p>
              <p className="text-center  text-base pt-3 font-normal">
                {member.description}
              </p>
              <div className="w-full flex justify-center pt-5 pb-5 gap-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.div>





















        {/* Features Section with Image */}
        <div className="lg:mx-16">
          <div>
            <h2 className="text-4xl font-semibold text-blue-900 mb-6 my-11">
              Why Choose Us ?
            </h2>

            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mb-16" />
            <div className="grid gap-8 md:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group  bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3  text-white rounded-xl p-8 border border-blue-100  hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="bg-blue-50 rounded-full p-3 mr-6 group-hover:scale-110 transition-transform duration-300">
                      <Check className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold  mb-3">
                        {feature.title}
                      </h3>
                      <p className=" leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
