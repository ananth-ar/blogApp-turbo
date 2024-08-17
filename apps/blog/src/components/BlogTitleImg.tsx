"use client"

type BlogHeadProps = {
  title: string;
  imagePreview: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setTitle: (title: string) => void;
};

export default function BlogTitleImg({
  title,
  imagePreview,
  handleImageChange,
  setTitle,
}: BlogHeadProps) {
  
  return (
    <>
      <div>
        <label>Title</label>
        <input
          className="text-5xl"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      {imagePreview && (
        <div>
          <img
            src={imagePreview}
            alt="Image Preview"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
    </>
  );
}
