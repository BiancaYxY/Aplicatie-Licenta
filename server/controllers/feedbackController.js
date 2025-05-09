require("dotenv").config();
const {Feedback, User} = require("../models");
const { v4: uuidv4 } = require("uuid");
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const feedbackController = {
    addFeedback: async(req, res) => {
        try {
            const {
                target_id,
                feedback_for,
                team_dynamics,
                coaching,
                communication,
                decision_making,
                motivation,
                written_feedback,
            } = req.body;

            const user_id = req.user.id;

            const feedback = await Feedback.create({
                id: uuidv4(),
                user_id,
                target_id,
                feedback_for,
                team_dynamics,
                coaching,
                communication,
                decision_making,
                motivation,
                created_at: new Date(),
                written_feedback,
            });

            return res.status(201).json({message:"Feedback added succesfully!", feedback});

        } catch(error) {
            console.error(error);
            res.status(500).json({message: "Error in adding feedback!"});
        }
    },

    //managers-only
    getFeedbackByManager: async (req, res) => {
        try {
          const managerId = req.user.id;
    
          const teamMembers = await User.findAll({
            where: { team_lead_id: managerId, rank: "employee" },
            attributes: ["id"],
          });
    
          const teamMemberIds = teamMembers.map(user => user.id);
    
          const feedbacks = await Feedback.findAll({
            where: {
              target_id: managerId,
              user_id: teamMemberIds,
              feedback_for: "manager",
            },
          });
    
          res.status(200).json(feedbacks);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Error in getting feedback!" });
        }
      },

      generateNPSReport: async (req, res) => {
        try {
          const managerId = req.user.id;
      
          const teamMembers = await User.findAll({
            where: { team_lead_id: managerId, rank: "employee" },
            attributes: ["id"],
          });
      
          const teamMemberIds = teamMembers.map(user => user.id);
      
          const feedbacks = await Feedback.findAll({
            where: {
              target_id: managerId,
              user_id: teamMemberIds,
              feedback_for: "manager",
            },
          });
      
          if (feedbacks.length === 0) {
            return res.status(404).json({ message: "No feedback found for report!" });
          }
      
          const categories = ["team_dynamics", "coaching", "communication", "decision_making", "motivation"];
          const results = {};
      
          for (const category of categories) {
            let sum = 0;
            let promoters = 0;
            let detractors = 0;
      
            for (const feedback of feedbacks) {
              const score = feedback[category];
              sum += score;
      
              if (score >= 8) promoters++;
              else if (score < 7) detractors++;
            }
      
            const avg = sum / feedbacks.length;
            const nps = ((promoters - detractors) / feedbacks.length) * 100;
      
            results[category] = {
              average: avg.toFixed(2),
              nps: `${nps.toFixed(0)}%`
            };
          }
      
          res.status(200).json({
            total_feedbacks: feedbacks.length,
            report: results,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Error in generating NPS report!" });
        }
      },

      summarizeFeedback: async (req, res) => {
        try {
      
          const managerId = req.user?.id;
          if (!managerId) {
            return res.status(401).json({ message: "Unauthorized" });
          }
      
          const feedbacks = await Feedback.findAll({
            where: {
              target_id: managerId,
              feedback_for: "manager"
            }
          });
      
          if (!feedbacks.length) {
            return res.status(404).json({ message: "No feedback found!" });
          }
      
          const limitedFeedbacks = feedbacks.slice(0, 5);
      
          const feedbackText = limitedFeedbacks.map((fb, index) => {
            return `Feedback ${index + 1}:
              - Team Dynamics: ${fb.team_dynamics}
              - Coaching: ${fb.coaching}
              - Communication: ${fb.communication}
              - Decision Making: ${fb.decision_making}
              - Motivation: ${fb.motivation}
              - Comentariu: ${fb.written_feedback || "–"}`;
            });
      
          const prompt = `Analizeaza urmatoarele evaluari oferite unui manager si genereaza un rezumat clar cu punctele forte si aspectele de imbunatatit:\n\n${feedbackText}`;
      
          const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "Esti un asistent care rezuma feedback-uri oferite managerilor." },
              { role: "user", content: prompt }
            ],
            temperature: 0.5,
            max_tokens: 300,
          });
      
          const summary = completion.choices[0].message.content;
          res.status(200).json({ summary });
      
        } catch (error) {
          console.error("OpenAI error:", error?.response?.data || error.message || error);
          res.status(500).json({ message: "Error in generating summary with OpenAI!" });
        }
      },
};

module.exports = feedbackController;