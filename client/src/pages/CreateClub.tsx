import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_GROUP } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import './css/CreateClub.css';


const CreateClubPage: React.FC = () => {
    const navigate = useNavigate()
    const [groupname, setGroupname] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state for character limit

    const [createGroup, { loading, error }] = useMutation(CREATE_GROUP, { onCompleted: (newClub) => { navigate(`/club/${newClub.createGroup._id}`) } });

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length > 250) {
            setErrorMessage("Description cannot exceed 250 characters.");
        } else {
            setErrorMessage(null);
        }
        setDescription(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (description.length > 250) {
            setErrorMessage("Description cannot exceed 250 characters.");
            return;
        }
        try {
            await createGroup({
                variables: {
                    groupname: groupname,
                    description: description,
                },
            });
        } catch (err) {
            console.error(err);
            alert("Error creating club.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h1 className="text-center">Create a Club</h1>
                            <form onSubmit={handleSubmit} className="mt-4">

                                <div className="form-group mb-3">
                                    <label htmlFor="groupname" className="form-label fw-bold">
                                        Group Name:
                                    </label>
                                    <input
                                        id="groupname"
                                        type="text"
                                        value={groupname}
                                        onChange={(e) => setGroupname(e.target.value)}
                                        required
                                        className="form-control"
                                        style={{ borderColor: "grey", boxShadow: "none" }}
                                    />
                                </div>


                                <div className="form-group mb-4">
                                    <label htmlFor="description" className="form-label fw-bold">
                                        Description: <span className="text-muted">(Max: 250 characters)</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        required
                                        rows={4}
                                        className={`form-control ${
                                            errorMessage ? "is-invalid" : ""
                                          }`}
                                          style={{ borderColor: "grey", boxShadow: "none" }}
                                        ></textarea>
                                        {errorMessage && (
                    <div className="invalid-feedback">{errorMessage}</div>
                  )}
                                </div>


                                <div className="text-center">
                                    <button
                                        type="submit"
                                        disabled={loading}

                                    >
                                        {loading ? "Creating..." : "Create Club"}
                                    </button>
                                </div>
                            </form>


                            {error && <p className="text-danger mt-3">{error.message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateClubPage;