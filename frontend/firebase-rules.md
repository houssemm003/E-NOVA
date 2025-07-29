# Règles Firebase à configurer

## 🔥 Règles Firestore (Base de données)

Allez dans Firebase Console > Firestore Database > Rules et remplacez par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /candidatures/{document} {
      allow write: if true;  // Permet l'écriture (soumission de candidatures)
      allow read: if false;  // Seuls les admins peuvent lire (via console)
    }
  }
}
```

## 📁 Règles Storage (Fichiers CVs)

Allez dans Firebase Console > Storage > Rules et remplacez par :

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /cvs/{allPaths=**} {
      allow write: if request.resource.size < 5 * 1024 * 1024  // Max 5MB
                   && request.resource.contentType.matches('application/pdf');  // PDF uniquement
      allow read: if false;  // Seuls les admins peuvent lire
    }
  }
}
```

## ⚙️ Étapes de configuration :

1. **Allez sur** [console.firebase.google.com](https://console.firebase.google.com)
2. **Sélectionnez votre projet** `e-nova-88742`
3. **Activez Firestore Database** :
   - Cliquez sur "Firestore Database"
   - Cliquez sur "Créer une base de données"
   - Choisissez "Mode de test" pour commencer
   - Sélectionnez une région (Europe-west1 recommandé)
4. **Activez Storage** :
   - Cliquez sur "Storage"
   - Cliquez sur "Commencer"
   - Choisissez "Mode de test" pour commencer
5. **Configurez les règles** comme indiqué ci-dessus

## 🔒 Sécurité :

- **Mode test** : Permet toutes les opérations (pour le développement)
- **Production** : Configurez des règles plus strictes plus tard
- **Monitoring** : Surveillez l'utilisation dans la console Firebase 