document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();
 
    // Simulate form data submission
    const formData = new FormData(this);
    const profileData = {
        currentPassword: formData.get('currentPassword'),
        newPassword: formData.get('newPassword'),
        confirmPassword: formData.get('confirmPassword'),
        notifications: []
    };
 
    formData.getAll('notifications').forEach(notification => {
        profileData.notifications.push(notification);
    });
 
    // Add validation logic if necessary
    if (profileData.newPassword !== profileData.confirmPassword) {
        alert('New passwords do not match!');
        return;
    }
 
    // Simulate saving the data
    console.log('Profile data:', profileData);
    alert('Profile settings saved successfully!');
    this.reset();
});