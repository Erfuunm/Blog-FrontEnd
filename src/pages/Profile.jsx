import React from 'react'
import { useUser } from '../Context/UserProvider';

export default function () {

    const { user } = useUser();


  return (
    <div >

<div class="col-lg-4 block bg-secondary mx-auto  mt-5 pt-5 rounded ">
                <div class="text-center card-box">
                    <div class="member-card pt-2 pb-2">
                        <div class="thumb-lg member-thumb mx-auto"><img src="https://via.placeholder.com/200" class="rounded-circle img-thumbnail" alt="profile-image"/></div>
                        <br/>
                        <div class="">
                            
                        <h4 class="text-muted">{user.firstName} <span>| </span>{user.lastName}</h4>
                        </div>
                        <button type="button" class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light">{user.email}</button>
                        <div class="mt-4">
                            <div class="row">
                                <div class="col-4">
                                    <div class="mt-3">
                                        <h4>{user.normalizedUserName}</h4>
                                        <p class="mb-0 text-muted">Nick Name</p>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mt-3">
                                        <h4>09152369462</h4>
                                        <p class="mb-0 text-muted">Phone Number</p>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="mt-3">
                                        <h4>{user.userName}</h4>
                                        <p class="mb-0 text-muted">User Name</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../src/assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>

    </div>
  )
}
