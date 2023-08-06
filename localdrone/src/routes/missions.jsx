import {
    Form,
    useLoaderData,
    useFetcher,
  } from "react-router-dom";
  import { getMissions } from "../missions";
  
  export async function action({ request, params }) {
    let formData = await request.formData();
    return updateContact(params.contactId, {
      favorite: formData.get("favorite") === "true",
    });
  }
  
  export async function loader({ params }) {
    const pilots = await getMissions(params.contactId);
    if (!pilots) {
      throw new Response("", {
        status: 400,
        statusText: "encountered error while loading pilots",
      });
    }
    return { contact };
  }
  
  export default function Missions() {
    return (
      <div>
        missionsDiv
      </div>
    )
  }