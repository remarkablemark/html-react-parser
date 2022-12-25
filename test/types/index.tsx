import parse from 'html-react-parser';

// $ExpectType string | Element | Element[]
parse('');

// $ExpectType string | Element | Element[]
parse('string');

// $ExpectType string | Element | Element[]
parse('<p>text</p>');

// $ExpectType string | Element | Element[]
parse('<li>1</li><li>2</li>');
