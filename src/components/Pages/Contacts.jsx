import { Box } from '@chakra-ui/react';
import { ContactForm } from 'components/Contacts/ContactForm/ContactForm';
import { ContactsFilter } from 'components/Contacts/ContactsFilter/ContactsFilter';
import { ContactsList } from 'components/Contacts/ContactsList/ContactsList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/selectors';
import { fetchContacts } from 'redux/contacts/contactsOperations';
import { Toaster } from 'react-hot-toast';

const Contacts = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <Box padding="20px 30px">
      <ContactForm />

      <ContactsFilter />
      {isLoggedIn && <ContactsList />}

      <Toaster position="top-right" />
    </Box>
  );
};

export default Contacts;
