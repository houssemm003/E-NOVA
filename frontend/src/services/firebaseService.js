import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export const submitCandidature = async (formData) => {
  try {
    // Upload CV to Firebase Storage
    let cvUrl = null;
    let cvFileName = null;
    
    if (formData.cv) {
      try {
        const cvRef = ref(storage, `cvs/${Date.now()}_${formData.cv.name}`);
        const cvSnapshot = await uploadBytes(cvRef, formData.cv);
        cvUrl = await getDownloadURL(cvSnapshot.ref);
        cvFileName = formData.cv.name;
        console.log('✅ CV uploadé avec succès:', cvFileName);
      } catch (storageError) {
        console.warn('⚠️ Erreur upload CV (continuing...):', storageError);
        cvFileName = formData.cv.name; // Garder le nom du fichier
      }
    }

    // Prepare data for Firestore
    const candidatureData = {
      nomComplet: formData.nomComplet,
      email: formData.email,
      telephone: formData.telephone,
      specialite: formData.specialite,
      anneeEtude: formData.anneeEtude,
      posteSouhaite: formData.posteSouhaite,
      autrePoste: formData.autrePoste || '',
      motivation: formData.motivation,
      experience: formData.experience,
      cvUrl: cvUrl || 'Erreur upload',
      cvFileName: cvFileName,
      linkedin: formData.linkedin || '',
      dateSoumission: serverTimestamp(),
      statut: 'en_attente'
    };

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'candidatures'), candidatureData);
    
    console.log('✅ Candidature sauvegardée dans Firestore:', docRef.id);
    
    return {
      success: true,
      id: docRef.id,
      message: 'Candidature soumise avec succès'
    };
  } catch (error) {
    console.error('Erreur lors de la soumission:', error);
    throw new Error('Erreur lors de la soumission de la candidature');
  }
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateFile = (file) => {
  if (!file) return false;
  if (file.type !== 'application/pdf') return false;
  if (file.size > 5 * 1024 * 1024) return false; // 5MB max
  return true;
}; 