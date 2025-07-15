const {Salary, User} = require("../models");
const { v4: uuidv4 } = require("uuid");
const PDFDocument = require("pdfkit");

const salaryController = {
    getSalaryDetails: async(req, res) => {
        try {
            const user_id = req.user.id;
            const salaries = await Salary.findAll({
                where: {user_id},
                order:[["year", "DESC"], ["month", "DESC"]],
            });

            res.status(200).json(salaries);
        } catch(error) {
            console.error(error);
            res.status(500).json({message: "Error in getting salary!"});
        }
    },

    downloadPayslip: async(req, res) => {
        try {
            const user_id = req.user.id;

            const user = await User.findByPk(user_id);

            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            const salary = await Salary.findOne({
                where: {user_id},
                order:[["year", "DESC"], ["month", "DESC"]], 
            });

            if(!salary) {
                return res.status(404).json({message: "No Salary found for this User!"});
            }

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                `attachment; filename=payslip_${salary.month}_${salary.year}.pdf`
            );

            const doc = new PDFDocument({ margin: 50 });
            doc.pipe(res);

            doc
              .fontSize(22)
              .fillColor("#0cb9c1")
              .text("Fisa de Salariu", { align: "center" })
              .moveDown(1);

            doc
              .moveTo(50, doc.y)
              .lineTo(550, doc.y)
              .strokeColor("#cccccc")
              .stroke()
              .moveDown(1);

            doc
              .fontSize(12)
              .fillColor("black")
              .text(`Nume: `, { continued: true })
              .font("Helvetica-Bold")
              .text(`${user.first_name} ${user.last_name}`);

            doc
              .font("Helvetica")
              .text(`Email: `, { continued: true })
              .font("Helvetica-Bold")
              .text(`${user.email}`);

            doc
              .font("Helvetica")
              .text(`Luna: `, { continued: true })
              .font("Helvetica-Bold")
              .text(`${salary.month}`);

            doc
              .font("Helvetica")
              .text(`An: `, { continued: true })
              .font("Helvetica-Bold")
              .text(`${salary.year}`)
              .moveDown(1);

            doc
              .moveTo(50, doc.y)
              .lineTo(550, doc.y)
              .strokeColor("#cccccc")
              .stroke()
              .moveDown(1);

            doc
              .font("Helvetica")
              .text(`Salariu de baza: `, { continued: true })
              .font("Helvetica-Bold")
              .text(`${salary.base_salary} RON`);

            doc
              .font("Helvetica")
              .text(`Bonus: `, { continued: true })
              .font("Helvetica-Bold")
              .text(`${salary.bonus} RON`);

            doc
              .font("Helvetica")
              .fillColor("#000")
              .text(`Total: `, { continued: true })
              .font("Helvetica-Bold")
              .fillColor("#0cb9c1")
              .text(
                `${parseFloat(salary.base_salary) + parseFloat(salary.bonus)} RON`
              );
            
            const path = require("path");
            const centerX = (doc.page.width - 80) / 2;

            try {
              const logoPath = path.join(__dirname, "..", "logo_hr_app.png");
              doc.moveDown(2);
              doc.image(logoPath, centerX, doc.y, { width: 80 });
            } catch (imgErr) {
              console.warn("Eroare la încărcarea logo-ului în PDF:", imgErr.message);
            }
            doc.end();
        } catch(err) {
            console.error("Error in generating payslip pdf", err);
            res.status(500).json({message: "Internal server error at salary!"});
        }
    },

    updateSalary: async (req, res) => {
        try {
          const salaryId = req.params.salaryId;
      
          const salaryToBeUpdated = {
            base_salary: req.body.base_salary,
            bonus: req.body.bonus,
            month: req.body.month,
            year: req.body.year,
          };

          const { base_salary, bonus, month, year } = req.body;

          if (base_salary < 4050 || bonus < 0) {
            return res.status(400).json({
              message: "Salariul de bază și bonusul nu pot fi valori negative!",
            });
          }
      
          const salary = await Salary.findByPk(salaryId);
      
          if (!salary) {
            return res.status(404).json({ message: "Salary not found!" });
          }
      
          await salary.update(salaryToBeUpdated);
      
          res.status(200).json({
            message: "Salary updated succesfully!",
            salary,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Error when updating salary!" });
        }
      },

      setSalary: async (req, res) => {
  try {
    const { user_id, base_salary, bonus, month, year } = req.body;

    const validMonths = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    if (!validMonths.includes(month)) {
      return res.status(400).json({ message: "Lună invalidă!" });
    }

    if (Number(base_salary) < 4050 || Number(bonus) < 0) {
      return res.status(400).json({
        message: "Salariul de bază și bonusul nu pot fi valori negative!",
      });
    }

    const existing = await Salary.findOne({
      where: { user_id, month, year }
    });

    if (existing) {
      return res.status(400).json({ message: "Salariul pentru această lună există deja!" });
    }

    const salary = await Salary.create({
      id: uuidv4(),
      user_id,
      base_salary,
      bonus,
      month,
      year
    });

    res.status(201).json({ message: "Salariul a fost adăugat cu succes!", salary });
  } catch (error) {
    console.error("Eroare în setSalary:", error);
    res.status(500).json({ message: "Eroare internă la adăugarea salariului!" });
  }
},
      getAllSalaries: async (req, res) => {
        try {
            const salaries = await Salary.findAll({
                order: [["year", "DESC"], ["month", "DESC"]],
            });
            res.status(200).json(salaries);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching all salaries" });
        }
    }
    };
  

module.exports = salaryController;