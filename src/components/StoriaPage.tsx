import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import ToolbarStoria from './storia/ToolbarStoria';
import { useStoriaStore } from '../stores/storiaStore';
import { Phase, Event } from '../stores/storiaStore';
import HeaderStoria from './storia/HeaderStoria';
import AddEventButton from './storia/AddEventButton';
import EventRenderer from './storia/EventRenderer';
import EventEditor from './storia/EventEditor';



interface StoriaPageProps {
  selectedFaseId?: string;
  setCurrentPage: (page: string) => void;
}

function StoriaPage({ selectedFaseId, setCurrentPage }: StoriaPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const fasi = useStoriaStore(state => state.phases);
  const currentFase = fasi.find(fase => fase.id === selectedFaseId);
  const removePhase = useStoriaStore(state => state.removePhase);
  const updatePhase = useStoriaStore(state => state.updatePhase);
  const [editedFase, setEditedFase] = useState<Phase | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const updateEvent = useStoriaStore(state => state.updateEvent);
  const deleteEvent = useStoriaStore(state => state.deleteEvent);

  const handleEdit = () => {
    if (currentFase) {
      setEditedFase({
        ...currentFase,
        title: currentFase.title || 'Titolo' // Set default title if empty
      });
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (editedFase && currentFase) {
      updatePhase(currentFase.id, editedFase);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (currentFase && window.confirm(`Delete fase "${currentFase.title}"?`)) {
      removePhase(currentFase.id);
      setCurrentPage('storia'); // Redirect back to main storia page
    }
  };

  const handleEditChange = (field: keyof Phase, value: string | number) => {
    if (editedFase) {
      setEditedFase({...editedFase, [field]: value});
    }
  };

  // Sort events by position
  const sortedEvents = currentFase ? 
    [...(currentFase.events || [])].sort((a, b) => a.position - b.position) : 
    [];

  // Handle event edit
  const handleEventEdit = (eventId: string) => {
    setEditingEventId(eventId);
  };

  // Handle event update
  const handleEventUpdate = (eventId: string, updatedEvent: Partial<Event>) => {
    if (currentFase) {
      updateEvent(currentFase.id, eventId, updatedEvent);
      setEditingEventId(null);
    }
  };

  // Handle cancel event edit
  const handleCancelEventEdit = () => {
    setEditingEventId(null);
  };

  // Add this function to handle drag end
  // Update the handleDragEnd function to use the proper type
  const handleDragEnd = (result: DropResult) => {
    console.log('Draggable ID:', result.draggableId);
    console.log('Current IDs:', sortedEvents.map(event => event.id));
    
    if (!result.destination || !currentFase) return;
  
    // Check if the draggable still exists
    const draggableExists = sortedEvents.some(event => event.id === result.draggableId);
    if (!draggableExists) return;
  
    const items = Array.from(sortedEvents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update positions for all events
    const updatedEvents = items.map((event, index) => ({
      ...event,
      position: index
    }));
    
    // Update all events in the phase
    updatedEvents.forEach(event => {
      updateEvent(currentFase.id, event.id, { position: event.position });
    });
  };

  // Update the export function to include events
  const handleExport = () => {
    if (currentFase) {
      // Sort events by position to ensure correct order
      const sortedEvents = [...(currentFase.events || [])].sort((a, b) => a.position - b.position);
      
      const exportData = {
        number: currentFase.number,
        title: currentFase.title,
        estimatedTime: currentFase.estimatedTime,
        events: sortedEvents.map(event => ({
          type: event.type,
          title: event.title,
          description: event.description,
          position: event.position
          // Non includiamo l'ID per generarne uno nuovo all'importazione
          // Non includiamo timestamp perché verrà creato nuovo all'importazione
        }))
      };
      
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `fase_${currentFase.number}_${currentFase.title.replace(/\s+/g, '_')}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
    }
  };

  if (!currentFase) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6 ">Storia Page</h1>
        <p>Select a fase from the sidebar</p>
      </div>
    );
  }

  // Handle event delete
  const handleEventDelete = (eventId: string) => {
    if (currentFase && window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(currentFase.id, eventId);
    }
  };

  return (
    <div>
      <ToolbarStoria
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onExport={handleExport}
        onDelete={handleDelete}
      />
      <HeaderStoria
        fase={currentFase}
        isEditing={isEditing}
        editedFase={editedFase}
        onEditChange={handleEditChange}
        allFasi={fasi}
      />
      
      {/* Add Event Button */}
      <div className="px-6 mt-6">
        <AddEventButton phaseId={currentFase.id} />
        
        {/* Render Events with Drag and Drop */}
        <div className="mt-6">
          {sortedEvents.length === 0 ? (
            <p className="text-gray-400 italic">Nessun evento. Aggiungi un evento per iniziare.</p>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="events">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {sortedEvents.map((event, index) => (
                      <Draggable 
                        key={event.id} 
                        draggableId={event.id} 
                        index={index}
                        isDragDisabled={!!editingEventId} // Disable drag while editing any event
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            {/* This is the key part: */}
                            {editingEventId === event.id ? (
                              // If this event is being edited, render EventEditor
                              <EventEditor 
                                key={`editor-${event.id}`} // Use a different key prefix for editor vs renderer
                                event={event}
                                onSave={(updatedEvent) => handleEventUpdate(event.id, updatedEvent)}
                                onCancel={handleCancelEventEdit}
                              />
                            ) : (
                              // Otherwise, render EventRenderer (which shows ActionEvent, DescriptiveEvent, etc.)
                              <EventRenderer 
                                key={`renderer-${event.id}`} // Use a different key prefix
                                event={event} 
                                // Pass the function to call when the edit icon inside EventRenderer is clicked
                                onEdit={() => handleEventEdit(event.id)} 
                                onDelete={() => handleEventDelete(event.id)}
                                // isEditing prop is not needed by EventRenderer itself anymore for description
                                dragHandleProps={provided.dragHandleProps}
                              />
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoriaPage;