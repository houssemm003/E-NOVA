import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Formulaire.css';

const competencesList = [
  'Communication / Rédaction',
  'Design / Graphisme',
  'Développement web',
  'Analyse de données',
  'Négociation / Partenariat',
  'Organisation d’événements',
  'Comptabilité / Finance',
  'Leadership / Management'
];

const heuresList = [
  'Moins de 2h',
  '2h à 4h',
  '4h à 6h',
  'Plus de 6h'
];

const Formulaire = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    telephone: '',
    specialite: '',
    anneeEtude: '',
    posteSouhaite: '',
    autrePoste: '',
    motivation: '',
    experience: '',
    disponibilite: '',
    engagements: '',
    competences: [],
    vision: '',
    attentes: '',
    linkedin: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState('');

  

  const postes = [
    'Vice-Président',
    'Responsable Communication',
    'Secrétaire général',
    'Responsable developpement commercial',
    'Responsable RH',
    'Responsable Projets',
    'Trésorier',
    'Autre'
  ];

  const annees = ['L1', 'L2', 'L3', 'M1', 'M2'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCompetenceChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const competences = prev.competences || [];
      if (checked) {
        return { ...prev, competences: [...competences, value] };
      } else {
        return { ...prev, competences: competences.filter(c => c !== value) };
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nomComplet.trim()) newErrors.nomComplet = 'Le nom complet est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'L\'email n\'est pas valide';
    if (!formData.telephone.trim()) newErrors.telephone = 'Le numéro de téléphone est requis';
    if (!formData.specialite.trim()) newErrors.specialite = 'La spécialité est requise';
    if (!formData.anneeEtude) newErrors.anneeEtude = 'L\'année d\'étude est requise';
    if (!formData.posteSouhaite) newErrors.posteSouhaite = 'Le poste souhaité est requis';
    if (formData.posteSouhaite === 'Autre' && !formData.autrePoste.trim()) newErrors.autrePoste = 'Veuillez préciser le poste';
    if (!formData.motivation.trim()) newErrors.motivation = 'La motivation est requise';
    if (!formData.experience.trim()) newErrors.experience = 'L\'expérience est requise';
    if (!formData.disponibilite) newErrors.disponibilite = 'Veuillez indiquer votre disponibilité';
    if (!formData.competences.length) newErrors.competences = 'Sélectionnez au moins une compétence';
    if (!formData.vision.trim()) newErrors.vision = 'Ce champ est requis';
    if (!formData.attentes.trim()) newErrors.attentes = 'Ce champ est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const { submitCandidature } = await import('../services/firebaseService');
      const result = await submitCandidature(formData);
      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => { navigate('/'); }, 3000);
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi de la candidature. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h2>Candidature envoyée avec succès !</h2>
        <p>Nous avons bien reçu votre candidature. Nous vous recontacterons bientôt.</p>
        <button onClick={() => navigate('/')} className="back-button">
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="formulaire-container">
      <div className="formulaire-content">
        <div className="form-header">
          <button onClick={() => navigate('/')} className="back-btn">← Retour</button>
          <h1>Formulaire de candidature</h1>
          <p>Rejoignez l'équipe E-NOVA</p>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>

            {firebaseStatus && (<p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{firebaseStatus}</p>)}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="candidature-form">
          <div className="form-section">
            <h2>Informations personnelles</h2>
            <div className="form-group">
              <label htmlFor="nomComplet">Nom complet *</label>
              <input type="text" id="nomComplet" name="nomComplet" value={formData.nomComplet} onChange={handleInputChange} className={errors.nomComplet ? 'error' : ''} />
              {errors.nomComplet && <span className="error-message">{errors.nomComplet}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email étudiant *</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={errors.email ? 'error' : ''} />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="telephone">Numéro de téléphone *</label>
              <input type="tel" id="telephone" name="telephone" value={formData.telephone} onChange={handleInputChange} className={errors.telephone ? 'error' : ''} />
              {errors.telephone && <span className="error-message">{errors.telephone}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="specialite">Spécialité ou filière *</label>
                <input type="text" id="specialite" name="specialite" value={formData.specialite} onChange={handleInputChange} className={errors.specialite ? 'error' : ''} />
                {errors.specialite && <span className="error-message">{errors.specialite}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="anneeEtude">Année d'étude *</label>
                <select id="anneeEtude" name="anneeEtude" value={formData.anneeEtude} onChange={handleInputChange} className={errors.anneeEtude ? 'error' : ''}>
                  <option value="">Sélectionnez une année</option>
                  {annees.map(annee => (<option key={annee} value={annee}>{annee}</option>))}
                </select>
                {errors.anneeEtude && <span className="error-message">{errors.anneeEtude}</span>}
              </div>
            </div>
          </div>
          <div className="form-section">
            <h2>Poste souhaité</h2>
            <div className="form-group">
              <label>Poste souhaité *</label>
              <div className="radio-group">
                {postes.map(poste => (
                  <label key={poste} className="radio-label">
                    <input type="radio" name="posteSouhaite" value={poste} checked={formData.posteSouhaite === poste} onChange={handleInputChange} />
                    <span className="radio-custom"></span>
                    {poste}
                  </label>
                ))}
              </div>
              {errors.posteSouhaite && <span className="error-message">{errors.posteSouhaite}</span>}
            </div>
            {formData.posteSouhaite === 'Autre' && (
              <div className="form-group">
                <label htmlFor="autrePoste">Précisez le poste *</label>
                <input type="text" id="autrePoste" name="autrePoste" value={formData.autrePoste} onChange={handleInputChange} className={errors.autrePoste ? 'error' : ''} />
                {errors.autrePoste && <span className="error-message">{errors.autrePoste}</span>}
              </div>
            )}
          </div>
          {/* Disponibilité et engagement */}
          <div className="form-section">
            <h2>Disponibilité et engagement</h2>
            <div className="form-group">
              <label>Combien d'heures par semaine pouvez-vous consacrer à E-NOVA ? *</label>
              <div className="radio-group">
                {heuresList.map(h => (
                  <label key={h} className="radio-label">
                    <input type="radio" name="disponibilite" value={h} checked={formData.disponibilite === h} onChange={handleInputChange} />
                    <span className="radio-custom"></span>
                    {h}
                  </label>
                ))}
              </div>
              {errors.disponibilite && <span className="error-message">{errors.disponibilite}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="engagements">Avez-vous des engagements en parallèle ? (clubs, associations, travail...)</label>
              <textarea id="engagements" name="engagements" value={formData.engagements} onChange={handleInputChange} rows="2" placeholder="Expliquez ici..." />
            </div>
          </div>
          {/* Compétences */}
          <div className="form-section">
            <h2>Compétences spécifiques</h2>
            <div className="form-group">
              <label>Quelles compétences souhaitez-vous mettre au service de la Junior Entreprise ? *</label>
              <div className="checkbox-group">
                {competencesList.map(c => (
                  <label key={c} className="checkbox-label">
                    <input type="checkbox" name="competences" value={c} checked={formData.competences.includes(c)} onChange={handleCompetenceChange} />
                    <span className="checkbox-custom"></span>
                    {c}
                  </label>
                ))}
              </div>
              {errors.competences && <span className="error-message">{errors.competences}</span>}
            </div>
          </div>
          {/* Motivation et expérience */}
          <div className="form-section">
            <h2>Motivation et expérience</h2>
            <div className="form-group">
              <label htmlFor="motivation">Pourquoi souhaitez-vous rejoindre E-NOVA ? *</label>
              <textarea id="motivation" name="motivation" value={formData.motivation} onChange={handleInputChange} rows="4" className={errors.motivation ? 'error' : ''} placeholder="Décrivez vos motivations pour rejoindre notre équipe..." />
              {errors.motivation && <span className="error-message">{errors.motivation}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="experience">Décrivez une expérience pertinente ou projet réalisé *</label>
              <textarea id="experience" name="experience" value={formData.experience} onChange={handleInputChange} rows="4" className={errors.experience ? 'error' : ''} placeholder="Parlez-nous d'une expérience ou d'un projet qui vous a marqué..." />
              {errors.experience && <span className="error-message">{errors.experience}</span>}
            </div>
          </div>
          {/* Vision et ambitions */}
          <div className="form-section">
            <h2>Vision et ambitions</h2>
            <div className="form-group">
              <label htmlFor="vision">Comment voyez-vous votre rôle dans la Junior Entreprise ? *</label>
              <textarea id="vision" name="vision" value={formData.vision} onChange={handleInputChange} rows="3" className={errors.vision ? 'error' : ''} placeholder="Votre vision..." />
              {errors.vision && <span className="error-message">{errors.vision}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="attentes">Qu’attendez-vous de votre passage dans E-NOVA, personnellement et professionnellement ? *</label>
              <textarea id="attentes" name="attentes" value={formData.attentes} onChange={handleInputChange} rows="3" className={errors.attentes ? 'error' : ''} placeholder="Vos attentes..." />
              {errors.attentes && <span className="error-message">{errors.attentes}</span>}
            </div>
          </div>
          {/* Lien LinkedIn */}
          <div className="form-section">
            <h2>Liens</h2>
            <div className="form-group">
              <label htmlFor="linkedin">Lien LinkedIn ou portfolio (facultatif)</label>
              <input type="url" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="https://linkedin.com/in/votre-profil" />
            </div>
          </div>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? (<><div className="spinner"></div>Envoi en cours...</>) : (<>📤 Envoyer ma candidature</>)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Formulaire; 