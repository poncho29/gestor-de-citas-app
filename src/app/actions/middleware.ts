export const handleTokenMiddleware = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", token);
    console.log("JWT guardado:", token);
  }
};

export const redirectToDashboardMiddleware = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/dashboard";
  }
};

export const handleErrorMiddleware = (error: unknown) => {
  if (error instanceof Error) {
    alert(error.message);
    console.error("Error durante el inicio de sesión:", error);
  } else {
    alert("Ocurrió un error inesperado.");
  }
};
