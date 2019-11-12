
class ReportModel {
       constructor(report) {
        this.title = report.title;
        this.type = report.type;
        this.location = report.location;
        this.Comment = report.Comment;
        this.images = report.images;
        this.videos= report.videos;
        this.status = draft; 
      }
    
      displayReport() {
        return {
            title: this.title,
            type: this.type,
            location: this.location,
            Comment: this.Comment,
            images: this.images,
            videos: this.videos,
            status: this.draft,  
        };
      }
    }
   
export {ReportModel as default};