import parse from 'html-react-parser';

// $ExpectType string | Element | Element[]
parse('\t<p>text \r</p>\n', { trim: true });
