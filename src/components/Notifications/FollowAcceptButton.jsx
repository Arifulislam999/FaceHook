/* eslint-disable react/prop-types */

import {
  useUserFollowAcceptMutation,
  useUserFollowDeclineMutation,
} from "../../Redux/Features/Post/postAPI";

const FollowAcceptButton = ({
  actionFollowStatus,
  reactUserId,
  notificationId,
}) => {
  const [userFollowDecline, { isLoading }] = useUserFollowDeclineMutation();
  const [userFollowAccept, { isLoading: acceptLoading }] =
    useUserFollowAcceptMutation();
  const handlerAccept = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await userFollowAccept({ data: { reactUserId, notificationId } });
  };
  const handlerReject = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await userFollowDecline({ data: { reactUserId, notificationId } });
  };
  const handlerRejectPoposal = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  {
    return actionFollowStatus === "panding" ? (
      <div className="flex z-50 mt-1">
        <div>
          <button
            onClick={handlerAccept}
            type="button"
            className="py-2 px-2 sm:px-5 me-2 mb-2 text-sm font-medium  focus:outline-none  rounded-lg border   focus:z-10 focus:ring-1  bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
          >
            {acceptLoading ? "Loading..." : "Follow Back"}
          </button>
        </div>
        <div>
          <button
            onClick={handlerReject}
            type="button"
            className="py-2 px-2 sm:px-5 me-2 mb-2 text-sm font-medium  focus:outline-none  rounded-lg border   focus:z-10 focus:ring-1 bg-red-500 text-white border-gray-600 hover:text-white hover:bg-gray-700"
          >
            {isLoading ? "Loading..." : "Decline"}
          </button>
        </div>
      </div>
    ) : (
      <div>
        {actionFollowStatus == "decline" && (
          <div>
            <button
              onClick={handlerRejectPoposal}
              type="button"
              className="py-2 px-2 opacity-45 sm:px-3 cursor-not-allowed me-2 mb-2 text-sm font-medium  focus:outline-none  rounded-lg border   focus:z-10 focus:ring-1 bg-gray-500 text-white border-gray-600 hover:text-white hover:bg-gray-700"
            >
              You Reject Proposal
            </button>
          </div>
        )}
        {actionFollowStatus == "success" && (
          <div>
            <button
              onClick={handlerRejectPoposal}
              type="button"
              className="py-2 px-2 opacity-45 sm:px-3 cursor-not-allowed me-2 mb-2 text-sm font-medium  focus:outline-none  rounded-lg border   focus:z-10 focus:ring-1 bg-gray-500 text-white border-gray-600 hover:text-white hover:bg-gray-700"
            >
              Accept Proposal
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default FollowAcceptButton;
