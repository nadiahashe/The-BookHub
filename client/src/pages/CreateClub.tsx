import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_GROUP } from "../utils/mutations";
import { useNavigate } from "react-router-dom";


const CreateClubPage: React.FC = () => {
    const navigate = useNavigate()
    const [groupname, setGroupname] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [createGroup, { loading, error }] = useMutation(CREATE_GROUP, {onCompleted: (newClub)=>{navigate(`/club/${newClub.createGroup._id}`)}});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                      />
                    </div>
    
                  
                    <div className="form-group mb-4">
                      <label htmlFor="description" className="form-label fw-bold">
                        Description:
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4}
                        className="form-control"
                      ></textarea>
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