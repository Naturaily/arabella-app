import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const CreateRepositoryModal = ({ toggleModal, fetchRepos }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [autoInit, setAutoInit] = useState(false);
    const [requestPending, setRequestPending] = useState(false);
    const [error, setError] = useState('');

    const sendForm = () => {
        const params = {
            name,
            description,
            auto_init: autoInit,
        };
        const token = localStorage.getItem('token');

        setRequestPending(true);
        setError('');

        axios.post('https://api.github.com/user/repos', params, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                setRequestPending(true);
                toggleModal();
                fetchRepos();
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setError('nameCollision');
                } else {
                    setError('unknown');
                }
                setRequestPending(false);
            });
    };

    const decodeError = () => {
        switch (error) {
        case 'unknown':
            return 'something went wrong. Please, try again later';
        case 'nameCollision':
            return 'repository of that name already exists';
        case 'emptyField':
            return 'name can not be empty';
        default:
            return '';
        }
    };

    const validate = () => {
        if (name === '') {
            setError('emptyField');
        } else {
            sendForm();
        }
    };

    return (
        <section className="create">
            <div className="create-main">
                <button type="button" onClick={toggleModal} className="create-main-close" disabled={requestPending}>Close</button>
                <h2>Create new public repository</h2>
                <form className="create-main-form">
                    <p>
                        Name:
                        <span>(Required)</span>
                    </p>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    {
                        error !== ''
                        && (
                            <span className="create-main-form-error">{`Error - ${decodeError()}`}</span>
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

CreateRepositoryModal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    fetchRepos: PropTypes.func.isRequired,
};

export default CreateRepositoryModal;
