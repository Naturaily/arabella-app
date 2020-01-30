test('sendForm - on success post, modal gets closed', () => {
    // mock axios
    // run sendForm with success state
    // check createVisible from Repos module
});

test('sendForm - on success post, fetchRepos gets dispatched', () => {
    // mock axios
    // run sendForm with success state
    // check if function fetchRepos from Repos module was called
});

test('sendForm - on failure 422, error is set to collision', () => {
    // mock axios
    // run sendForm with 422 failure state
    // check error state
});

test('sendForm - on failure other than 422, error is set to unknown', () => {
    // mock axios
    // run sendForm with non 422 failure state
    // check error state
});

test('validate - if name is empty, error is set to emptyField', () => {
    // mock name state
    // run function
    // check output
});

test('validate - if name is not empty, error is set to empty string', () => {
    // mock name state
    // run function
    // check output
});
