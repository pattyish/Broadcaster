import Joi from 'Joi';

class ReportHelper {
validateReport(body){
    const schema = {
      title: Joi.string().min(4).required(),
      type: Joi.string().min(4).required(),
      location: Joi.string().required(),
      comment: Joi.string().min(10).required(),
      images: Joi.string(),
      videos: Joi.string(),

    };
    return Joi.validate(body, schema);
}
}

export { ReportHelper as default };