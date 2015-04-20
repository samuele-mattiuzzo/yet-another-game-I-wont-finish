/*
    story = {}
    
    read = 
    <ID (int)> : {
        'text': <string>,
        'choices': {
            <ID (int)>: {
                'text': <string>,
                'panic': <int>,
                'sadness': <int>,
                'hope': <int>,
                'wisdom': <int>,
                'confusion': <int>,
                'link_to': <ID (int)> // read_id
            }
        },
        'link_to': <ID (int)> // read_id,
        'ending': <ID (int)> // ending_id
    }
*/


var STORY = {
    1: {
        'text': 'test',
        'choices': {
            1: {
                'text': 'test choice',
                'panic': +10,
                'sadness': +1,
                'hope': -5,
                'link_to': 2
            }
        },
        'link_to': 1,
    }
};

