import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Users, CheckSquare } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import Footer from '../components/layout/Footer';
import './Pages.css';

function Home() {
  const { currentUser } = useAuth();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: CheckSquare,
      title: "Task Management",
      description: "Organize tasks with custom statuses, priorities, and assignees.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Invite team members, assign tasks, and track progress together.",
    },
    {
      icon: Clock,
      title: "Automation",
      description: "Create custom rules to automate repetitive project tasks.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <motion.div
              className="flex-1 max-w-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="hero-title">
                Simplify your workflow with TaskBoard Pro
              </h1>
              <p className="hero-description">
                The all-in-one collaboration platform that helps teams manage projects, automate workflows, and track progress in real-time.
              </p>
              <div className="hero-buttons">
                <Link to={currentUser ? "/dashboard" : "/login"} className="primary-button">
                  Get Started for Free
                </Link>
                <Link to="#demo" className="secondary-button">
                  Watch Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="hero-image-container">
                <div className="hero-image-gradient"></div>
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="TaskBoard Pro Dashboard"
                  className="hero-image"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container mx-auto px-4">
          <motion.div
            className="features-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Features designed for productivity</h2>
            <p>Everything you need to manage projects efficiently and keep your team on the same page.</p>
          </motion.div>

          <motion.div
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                variants={itemVariants}
              >
                <div className="feature-icon">
                  <feature.icon />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Ready to transform how your team works?</h2>
            <p>Join thousands of teams already using TaskBoard Pro to achieve their goals faster.</p>
            <Link to="/login" className="cta-button">
              Start Your Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
