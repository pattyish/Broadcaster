import Helper from '../helper/reportHelp';
import ReportModel from '../models/reportModel';
import DbOperation from '../models/dbOperation';

const DbQuery = new DbOperation('reports');
class Report {
    async createReport(req, res){
      
    }
    async getAllReport(req, res){
      // const { user } = req.user;
      // if(!user.isAdmin) return res.status(403).json({ status: 403, message: "you don\'t have permision to this page"});
      const allReports = await DbQuery.selectAll();
      if (allReports) return res.status(401).json({ status: 401, message: "there is no reports in database " });
      const reports = allReports.rows;
      res.status(200).json({ status: 200, message: "all reports created", data: { reports } });
    } 

    async getReportById(req, res){
     const { id } = req.params;
     const { user } = req.user;
     
    }

    async getReportByStatus(){

    }

    async getReportByType(){

    }
}

export { Report as default };