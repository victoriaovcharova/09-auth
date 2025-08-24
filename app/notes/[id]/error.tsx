"use client";

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  return (
    <div>
      <h2>Помилка при завантаженні</h2>
      <p>Could not fetch note details. {error.message}</p>
    </div>
  );
};

export default Error;
