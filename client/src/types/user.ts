export interface User {
  name: string;
  email: string;
  role: "customer" | "admin";
  avatar?: Image[];
}

interface Image {
  url: string;
  public_alt: string;
}
