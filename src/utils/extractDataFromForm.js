
/**
 * 
 * @param {FormData} formData
 * 
 * returns  object representation of the form data 
 */
const extractDataFromForm = (formData) => {
   
    const data = {};
    for (let key of formData.keys()) { 
        data[key] = formData.get(key);
    }
    return data;
}

export default extractDataFromForm;