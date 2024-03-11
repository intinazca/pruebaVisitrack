'use strict'
var userSchema = require('../modelo/user');
var controller = {

    post: function (req, res) {
        try {
            console.log("req:", req.body);
            var user = new userSchema();

            user.name = req.body.name;
            user.email = req.body.email;
            user.age = req.body.age;
            user.gender = req.body.gender;

            console.log(user);
            user.save().then(savedUser => {
                console.log("response: ", savedUser);
                return res.status(200).json({ status: 200, message: `Usuario ${req.body.name} guardado con exito` });
            }).catch(error => {
                console.log(error);
                return res.status(500).json({ status: 500, message: 'Error al guardar el usuario' });
            });
        } catch (error) {
            return res.status(500).json({ status: 500, message: 'Error en la consulta' });
        }
    },

    get: function (req, res) {
        try {
            userSchema.find().then(users => {
                return res.status(200).json({ status: 200, message: `consulta ok`, users });
            }).catch(error => {
                console.log(error);
                return res.status(500).json({ status: 500, message: 'Error al guardar el usuario' });
            });
        } catch (error) {
            console.log("error", error);
            return res.status(500).json({ status: 500, message: 'Error en la consulta' });
        }
    },

    put: async function (req, res) {
        try {
            const userId = req.params.id;
            const updatedUserData = req.body;

            console.log("userId: ", userId);
            console.log("updatedUserData: ", updatedUserData);

            const updatedUser = await userSchema.findByIdAndUpdate(userId, updatedUserData, { new: true });
            console.log("updatedUser: ", updatedUser);
            if (!updatedUser) {
                return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });
            }
    
            return res.status(200).json({ status: 200, message: 'Usuario actualizado exitosamente', data: updatedUser });    
        } catch (error) {
            return res.status(500).json({ status: 500, message: 'Error en la consulta' });
        }
    },

    delete: async function (req, res) {
        try {
            const userId = req.params.id;
            console.log("userId:", userId);

            const deletedUser = await userSchema.findOneAndDelete({ _id: userId });;
            console.log("deletedUser: ", deletedUser);
            if (!deletedUser) {
              return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });
            }
        
            return res.status(200).json({ status: 200, message: 'Usuario eliminado exitosamente', data: deletedUser });
          
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: 'Error en la consulta' });
        }
    },

}

module.exports = controller;