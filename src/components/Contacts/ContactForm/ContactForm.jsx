import { addContact } from 'redux/contacts/contactsOperations';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getIsLoading } from 'redux/contacts/selectors';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { searchName } from 'components/helpers/js/searchName';
import toast from 'react-hot-toast';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const IsLoading = useSelector(getIsLoading);
  const contacts = useSelector(getContacts);

  const border = useColorModeValue('1px solid #805AD5', '1px solid white');

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    onSubmit: async values => {
      if (searchName(contacts, values)) {
        return toast.error(`${values.name} is already in contacts`);
      }

      dispatch(addContact(values));
      resetForm();
    },
  });

  const resetForm = () => {
    formik.resetForm();
  };

  return (
    <>
      <Heading>PhoneBook</Heading>

      <Box bg="dark" p={6} rounded="lg" w={500} border={border} mt={5}>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.name}
                id="name"
                name="name"
                type="text"
                variant="filled"
                border="1px solid white"
                _focus={{ border: '1px solid #d5a6bd' }}
                pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="number">Phone Number</FormLabel>

              <Input
                onChange={formik.handleChange}
                value={formik.values.number}
                id="number"
                name="number"
                type="tel"
                variant="filled"
                border="1px solid white "
                _focus={{ border: '1px solid #d5a6bd' }}
                minLength="10"
                maxLength="13"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                required
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="purple"
              width="full"
              disabled={IsLoading}
            >
              Add Contact
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};
