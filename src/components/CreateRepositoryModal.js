import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const ERRORS = {
  RESET_ERRORS: '',
  NAME_COLLISION: 'Error - repository of that name already exists',
  UNKNOWN_ERROR: 'Error - something went wrong. Please, try again later',
  EMPTY_NAME: 'Error - name can not be empty',
  UNAUTHORISED: 'Error - your token is invalid, please refresh site',
};

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
    const baseURL = 'https://api.github.com';

    setRequestPending(true);

    axios.post(`${baseURL}/user/repos`, params, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setRequestPending(false);
        toggleModal();
        fetchRepos();
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setError(ERRORS.NAME_COLLISION);
        } else if (err.response.status === 401) {
          setError(ERRORS.UNAUTHORISED);
        } else {
          setError(ERRORS.UNKNOWN_ERROR);
        }
        setRequestPending(false);
      });
  };

  const validate = () => {
    if (name === '') {
      setError(ERRORS.EMPTY_FIELD);
    } else {
      setError(ERRORS.RESET_ERRORS);
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
              <span className="create-main-form-error">{error}</span>
            )
          }
          <p>Description:</p>
          <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
          <label htmlFor="autoInit">
            Auto init
            <input type="checkbox" id="autoInit" onChange={() => setAutoInit((prev) => !prev)} checked={autoInit} />
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
