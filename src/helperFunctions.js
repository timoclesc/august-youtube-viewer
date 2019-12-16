import he from 'he'

export function   previewString (str) {
    if (str.length > 50) {
      return str.slice(0, Math.max(str.indexOf(" ",50),50)) + "..."
    }
    return str
  }


export function removeHtmlEntities(str) {
  console.log(str)
        return he.decode(str)
    }
    
