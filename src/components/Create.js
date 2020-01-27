import React, { useState } from 'react';

import axios from 'axios';

const Create = ({ closeModal, fetchRepos }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [autoInit, setAutoInit] = useState(false);
    const [requestPending, setRequestPending] = useState(false);
    const [nameEmptyError, setNameEmptyError] = useState(false);
    const [nameCollisionError, setNameCollisionError] = useState(false);
    const [unknownError, setUnknownError] = useState(false);

    const sendForm = () => {
        setRequestPending(true);
        setUnknownError(false);
        setNameCollisionError(false);
        setNameEmptyError(false);
        const params = {
            name,
            description,
            auto_init: autoInit,
        };
        const token = localStorage.getItem('token');
        axios.post('https://api.github.com/user/repos', params, { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {
                setRequestPending(true);
                closeModal();
                fetchRepos();
                console.log(result);
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    setNameCollisionError(true);
                } else {
                    setUnknownError(true);
                }
                setRequestPending(false);
                console.log({ error });
            });
    };

    const validate = () => {
        if (name === '') {
            setNameCollisionError(false);
            setUnknownError(false);
            setNameEmptyError(true);
        } else {
            sendForm();
        }
    };

    return (
        <section className="create">
            <div className="create-main">
                <button type="button" onClick={closeModal} className="create-main-close" disabled={requestPending}>Close</button>
                <h2>Create new public repository</h2>
                <form className="create-main-form">
                    <p>
                        Name:
                        <span>(Required)</span>
                    </p>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    {
                        nameEmptyError
                        && (
                            <span className="create-main-form-error">Error - name can not be empty</span>
                        )
                    }
                    {
                        nameCollisionError
                        && (
                            <span className="create-main-form-error">Error - repository of that name already exists</span>
                        )
                    }
                    {
                        unknownError
                        && (
                            <span className="create-main-form-error">Error - something went wrong. Please, try again later</span>
                        )
                    }
                    <p>Description:</p>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
                    <label htmlFor="autoInit">
                        Auto init
                        <input type="checkbox" id="autoInit" onChange={() => setAutoInit(!autoInit)} checked={autoInit === true} />
                    </label>
                </form>
                {
                    requestPending
                        ? <p>Creating repository...</p>
                        : <button type="button" onClick={validate} className="create-main-send" disabled={requestPending}>Send</button>
                }
            </div>
            <div className="create-mask" />
        </section>
    );
};

export default Create;
