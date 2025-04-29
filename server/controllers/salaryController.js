const {Salary, User} = require("../models");
const PDFDocument = require("pdfkit");


const salaryController = {
    getSalaryDetails: async(req, res) => {
        try {
            const user_id = req.user_id;
            const salaries = Salary.findAll({
                where: {user_id},
                order:[["year", "DESC"], ["month", DESC]],
            });

            res.status(200).json(salaries);
        } catch(error) {
            console.error(error);
            res.status(500).json({message: "Error in getting salary!"});
        }
    },

    downloadPayslip: async(req, res) => {
        try {
            const user_id = req.user_id;
            const user = findByPk(user_id);
            if(!user) {
                return res.status(404).json({message:"User not found!"});
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
                "Content Disposition",
                `attachment; filename=payslip_${salary.month}_${salary.year}.pdf`
            );

            const doc = new PDFDocument();
            doc.pipe(res);
            doc.fontSize(20).text('Fisa de Salariu', { align: 'center' });
            doc.moveDown();
      
            doc.fontSize(12).text(`Nume: ${user.firstName} ${user.lastName}`);
            doc.text(`Email: ${user.email}`);
            doc.text(`Luna: ${salary.month}`);
            doc.text(`An: ${salary.year}`);
            doc.moveDown();
      
            doc.text(`Salariu de baza: ${salary.base_salary} RON`);
            doc.text(`Bonus: ${salary.bonus} RON`);
            doc.text(`Total: ${parseFloat(salary.base_salary) + parseFloat(salary.bonus)} RON`);
      
            doc.end();
        } catch(err) {
            console.error("Error in generating payslip pdf", err);
            res.status(500).json({message: "Internal server error at salary!"});
        }
    },

}

module.exports = salaryController;