const {Feedback, User} = require("../models");
const {OpenAI} = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
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
                motivation
            } = req.body;

            const user_id = req.user_id;

            const feedback = await Feedback.create({
                user_id,
                target_id,
                feedback_for,
                team_dynamics,
                coaching,
                communication,
                decision_making,
                motivation,
                created_at: new Date(),
            });

            return res.status(201).json({message:"Feedback added succesfully!", feedback});

        } catch(err) {
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
          const managerId = req.user.id;
    
          const feedbacks = await Feedback.findAll({
            where: {
              target_id: managerId,
              feedback_for: "manager"
            }
          });
    
          if (!feedbacks.length) {
            return res.status(404).json({ message: "No feedback found!" });
          }
    
          const feedbackText = feedbacks.map((fb, index) => {
            return `Feedback ${index + 1}:
            - Team Dynamics: ${fb.team_dynamics}
            - Coaching: ${fb.coaching}
            - Communication: ${fb.communication}
            - Decision Making: ${fb.decision_making}
            - Motivation: ${fb.motivation}`;
          }).join("\n");
    
          const prompt = `
    Am urmatoarele evaluari oferite unui manager de catre echipa sa. Fa o analiză profesională, evidentiind punctele tari si cele care necesită imbunatatire.
    
    ${feedbackText}
    `;
    
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: prompt
              }
            ],
            temperature: 0.5,
            max_tokens: 300
          });
    
          const summary = response.choices[0].message.content;
    
          res.status(200).json({ summary });
        } catch (error) {
          console.error("OpenAI error:", error);
          res.status(500).json({ message: "Error in generating summary with openai!" });
        }
      },
};

module.exports = feedbackController;