import parse from 'html-react-parser';

// $ExpectType string | Element | Element[]
parse('<p/><p/>', {
  htmlparser2: {
    xmlMode: true,
    decodeEntities: true,
    lowerCaseTags: false,
    lowerCaseAttributeNames: false,
    recognizeCDATA: true,
    recognizeSelfClosing: true
  }
});
