// app/components/ProfileEditForm.tsx
"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { updateProfile } from "../../../../lib/actions/userActions";


interface User {
  id: string;
  name: string | null;
  username: string;
  email: string;
  image: string | null;
  description: string | null;
  SocialMedia: {
    x: string | null;
    instagram: string | null;
    facebook: string | null;
    youtube: string | null;
  } | null;
}

interface ProfileEditFormProps {
  user: User;
}

export type FormState = {
  success: boolean;
  message: string;
};

const initialState: FormState = {
  success: false,
  message: "",
};

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const [state, formAction] = useFormState(updateProfile, initialState);
  const [formData, setFormData] = useState({
    username: user.username,
    name: user.name || "",
    image: user.image || "",
    description: user.description || "",
    x: user.SocialMedia?.x || "",
    instagram: user.SocialMedia?.instagram || "",
    facebook: user.SocialMedia?.facebook || "",
    youtube: user.SocialMedia?.youtube || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="userId" value={user.id} />

      <div>
        <label htmlFor="name" className="block mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1">
          UserName
        </label>
        <input
          type="email"
          id="email"
          name="username"
          readOnly
          value={user.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          readOnly
          value={user.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        {formData.image && (
          // <Image
          //   src={formData.image}
          //   alt="Profile"
          //   width={100}
          //   height={100}
          //   className="mt-2 rounded"
          // />
          <img src={formData.image} className="h-12 w-12" />
        )}
      </div>

      <div>
        <label htmlFor="description" className="block mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          rows={3}
        />
      </div>

      <div>
        <h3 className="font-bold mb-2">Social Media</h3>
        <div className="space-y-2">
          {["x", "instagram", "facebook", "youtube"].map((platform) => (
            <div key={platform}>
              <label htmlFor={platform} className="block mb-1 capitalize">
                {platform}
              </label>
              <input
                type="text"
                id={platform}
                name={platform}
                value={formData[platform as keyof typeof formData]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Profile
      </button>

      {state.message && (
        <p
          className={`mt-4 ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
