export function isUrl(s) {
    let url
  
    try {
      url = new URL(s)
    } catch (_) {
      return false
    }
  
    return url.protocol === 'https:'
  }