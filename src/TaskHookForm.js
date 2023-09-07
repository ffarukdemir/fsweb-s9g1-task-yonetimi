import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

export default function TaskHookForm(props) {
  const { kisiler, submitFn } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { id: nanoid(5), title: "", description: "", people: [] },
    mode: "onChange",
  });

  const submitHandler = (data, event) => {
    submitFn({ ...data, status: "yapılacak" });
    event.target.reset();
  };

  const validateTitle = (value) => {
    return (
      value.trim().length >= 3 || "Gorev baslığı en az 3 karakter olmalı. "
    );
  };

  const validateDescription = (value) => {
    return value.trim().length >= 10 || "Açıklma en az 10 karakter olmalı. ";
  };

  const validatePeople = (value) => {
    return (
      (value.length >= 1 && value.length <= 3) ||
      "insanlar en az 1 en çok 3 olmalı. "
    );
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(submitHandler)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", { validate: validateTitle })}
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", { validate: validateDescription })}
        ></textarea>
        <p className="input-error">{errors.description?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                value={p}
                {...register("people", { validate: validatePeople })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
