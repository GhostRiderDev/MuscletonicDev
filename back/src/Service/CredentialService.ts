import { UUID } from "crypto";
import CredentialEntity from "../Entity/CredentialEntity";
import { CredentialDAO } from "../DAO/DAOs";
import bcrypt from "bcryptjs";

export const validateCredential = async (
  id: UUID,
  key: string
): Promise<boolean> => {
  const credential = await CredentialDAO.findOneBy({
    id_credential: id,
  });
  if (!credential) {
    return false;
  }
  return bcrypt.compare(key, credential?.password_hash);
};

export const addCredential = async (key: string): Promise<string> => {
  const credentialFromEntity = new CredentialEntity();
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(key, saltRounds);
  credentialFromEntity.password_hash = passwordHash;
  const credentialSaved: CredentialEntity = await CredentialDAO.save(
    credentialFromEntity
  );
  return credentialSaved.id_credential;
};

export const removeCredential = async (id: UUID): Promise<void> => {
  const credential = await CredentialDAO.findOneBy({ id_credential: id });
  if (!credential) throw new Error("Credential not found");
  await CredentialDAO.delete(id);
};
