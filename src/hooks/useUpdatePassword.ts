import { useState } from "react"
import supabase from "@/utils/supabase"

interface UpdatePasswordResult {
    success: boolean
    message: string
}

export const useUpdatePassword = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    const checkPasswordStrength = (pass: string) => {
        const rules = [
            { regex: /.{8,}/, message: "La contraseña debe tener al menos 8 caracteres." },
            { regex: /[A-Z]/, message: "La contraseña debe tener al menos una letra mayúscula." },
            { regex: /[0-9]/, message: "La contraseña debe tener al menos un número." },
            {
                regex: /[!@#$%^&*()_+\-={};':"|,<>?]/,
                message: "La contraseña debe tener al menos un carácter especial (!@#$...).",
            },
        ]

        for (const rule of rules) {
            if (!rule.regex.test(pass)) {
                return rule.message
            }
        }
        return null
    }

    const updatePassword = async (password: string, confirmPassword: string): Promise<UpdatePasswordResult> => {
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            if (password !== confirmPassword) {
                throw new Error("Las contraseñas no coinciden")
            }

            const strengthError = checkPasswordStrength(password)
            if (strengthError) {
                throw new Error(strengthError)
            }

            const { error: supabaseError } = await supabase.auth.updateUser({
                password: password,
            })

            if (supabaseError) throw supabaseError

            setSuccess(true)
            return { success: true, message: "Contraseña actualizada exitosamente" }
        } catch (err: any) {
            const msg = err.message || "Error al actualizar la contraseña"
            setError(msg)
            return { success: false, message: msg }
        } finally {
            setLoading(false)
        }
    }

    return {
        updatePassword,
        loading,
        error,
        success,
        setError, // Exporting setError to allow manual clearing if needed
        checkPasswordStrength
    }
}
