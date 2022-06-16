import React from 'react';
import Button from './Button';

function AddItemTabHeader({ name, add_name, edit_name, description, action }: { name: string, add_name?: string, edit_name?: string, description: string, action?: () => void }) {
    return (
        <div className='flex mb-2 lg:flex-row flex-col items-center'>
            <div className="mr-4 mb-2">
                <label className="block text-lg font-medium">{name}</label>
                <span className="text-sm text-gray-400">{description}</span>
            </div>
            {action && (add_name || edit_name) &&
                <div className="lg:ml-auto">
                    <Button text={add_name ? `Adicionar ${add_name}` : edit_name } action={action} />
                </div>
            }
        </div>
    )
}

export default AddItemTabHeader;