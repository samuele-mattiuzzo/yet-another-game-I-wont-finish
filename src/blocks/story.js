/*
    story = array[1..5]
    
    block = 
    <ID (int)> : {
        'text': <string>,
        'choices': [false | {
            <ID (int)>: {
                'text': <string>,
                'panic': <int>,
                'sadness': <int>,
                'hope': <int>,
                'wisdom': <int>,
                'confusion': <int>,
                'link_to': <ID (int)> // block_id
            }
        }],
        'link_to': <ID (int)> // block_id,
        'ending': [false | <ID (int)> // ending_id]
    }
*/

var STORY = {};

STORY[1] = {
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
        'link_to': 2,
    }
};
