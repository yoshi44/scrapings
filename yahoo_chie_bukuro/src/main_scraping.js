
function getKeywords(url) {
  const html = UrlFetchApp.fetch(url).getContentText()
Logger.log("log html===" + html);
    return {
      "urls" : Parser.data(html)
                     .from("<div class=\"KSsin\">\n<h3><a href=\"")
                     .to("\">")
                     .iterate()

    }
}

/**
 *
 */
function doGet(e) {
  if (underscoreGS._isEmpty(e.parameter.action)) {
    return ContentService.createTextOutput(JSON.stringify({error :'action is required'})).setMimeType(ContentService.MimeType.JSON);
  }
   
  const url = "https://chiebukuro.yahoo.co.jp/search/?p=" + e.parameter.action + "&flg=3&class=1&ei=UTF-8&fr=common-navi"
  
  const json = {
    "result" : "OK",
    "action" : e.parameter.action,
    "urls" : getKeywords(url).urls
  }

Logger.log("json===" + json);
  return ContentService.createTextOutput(JSON.stringify(json, null, 2))
                       .setMimeType(ContentService.MimeType.JAVASCRIPT);
  
}


